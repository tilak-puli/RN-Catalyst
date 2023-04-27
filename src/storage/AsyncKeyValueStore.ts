import RnAsyncStorage from '@react-native-async-storage/async-storage';
import {KeyValueStore} from './KeyValueStore';

interface CacheType {
  [key: string]: {
    value: string | null;
    createdAt: Date;
  };
}

export class AsyncKeyValueStore implements KeyValueStore {
  #cache: CacheType;

  constructor() {
    this.#cache = {};
  }

  getFromCache(key: string): string | null {
    const data = this.#cache[key];
    if (data) {
      return data.value;
    }
    return null;
  }

  addIntoCache(key: string, value: string | null) {
    this.#cache[key] = {value, createdAt: new Date()};
  }

  removeFromCache(key: string): void {
    delete this.#cache[key];
  }

  resetCache(): void {
    this.#cache = {};
  }

  // setItem = RnAsyncStorage.setItem;
  setItem(key: string, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
      RnAsyncStorage.setItem(key, value)
        .then(() => {
          this.addIntoCache(key, value);
          resolve();
        })
        .catch(reject);
    });
  }

  // getItem = RnAsyncStorage.getItem;
  getItem(key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const cachedValue = this.getFromCache(key);
      if (cachedValue === null) {
        RnAsyncStorage.getItem(key)
          .then(result => {
            const value = result;
            this.addIntoCache(key, value);
            resolve(value);
          })
          .catch(reject);
      } else {
        resolve(cachedValue);
      }
    });
  }

  // deleteItem = RnAsyncStorage.removeItem;
  deleteItem(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      RnAsyncStorage.removeItem(key)
        .then(() => {
          this.removeFromCache(key);
          resolve();
        })
        .catch(reject);
    });
  }

  // multiGet = RnAsyncStorage.multiGet;

  multiGet(keys: string[]): Promise<readonly [string, string | null][]> {
    return new Promise((resolve, reject) => {
      const valuesArray = keys.map(key => this.getItem(key));
      Promise.all(valuesArray)
        .then(values => {
          const result: [string, string | null][] = keys.map((key, index) => [
            key,
            values[index],
          ]);
          resolve(result);
        })
        .catch(reject);
    });
  }

  /* eslint-disable class-methods-use-this */
  getAllItems(): Promise<readonly [string, string | null][]> {
    return new Promise((resolve, reject) => {
      RnAsyncStorage.getAllKeys()
        .then((keys: readonly string[]) => RnAsyncStorage.multiGet(keys))
        .then(result => {
          resolve(result);
        })
        .catch(reject);
    });
  }

  /**
   * Deletes all key value pairs
   */
  // clear = RnAsyncStorage.clear;
  clear(): Promise<void> {
    return new Promise((resolve, reject) => {
      RnAsyncStorage.clear()
        .then(() => {
          this.resetCache();
          resolve();
        })
        .catch(reject);
    });
  }
}
