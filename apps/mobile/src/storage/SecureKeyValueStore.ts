import * as Keychain from 'react-native-keychain';
import {KeyValueStore} from './KeyValueStore';

interface CacheType {
  [key: string]: {
    value: string | null;
    createdAt: Date;
  };
}

export default class SecureKeyValueStore implements KeyValueStore {
  #cache: CacheType;

  TTL: number; // this is in minutes // TODO: when we add env variables/config, add this to config

  constructor(ttl: number) {
    this.#cache = {};
    this.TTL = ttl;
  }

  isCacheExpired(createdAt: Date) {
    return createdAt.getTime() + this.TTL * 60 * 1000 < new Date().getTime();
  }

  getFromCache(key: string): string | null {
    const data = this.#cache[key];
    if (data && !this.isCacheExpired(data.createdAt)) {
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

  /**
   * Save a single item
   */
  setItem(key: string, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
      Keychain.setGenericPassword(key, value, {service: key})
        .then(() => {
          this.addIntoCache(key, value);
          resolve();
        })
        .catch(reject);
    });
  }

  /**
   * Get a single item
   */
  getItem(key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const cachedValue = this.getFromCache(key);
      if (cachedValue === null) {
        Keychain.getGenericPassword({service: key})
          .then(result => {
            const value = result !== false ? result.password : null;
            this.addIntoCache(key, value);
            resolve(value);
          })
          .catch(reject);
      } else {
        resolve(cachedValue);
      }
    });
  }

  /**
   * Deletes a single item
   */
  deleteItem(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      Keychain.resetGenericPassword({service: key})
        .then(() => {
          this.removeFromCache(key);
          resolve();
        })
        .catch(reject);
    });
  }

  /**
   * Get multiple items
   */
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

  /**
   * Get all the items
   */
  getAllItems(): Promise<readonly [string, string | null][]> {
    return new Promise((resolve, reject) => {
      Keychain.getAllGenericPasswordServices()
        .then((keys: string[]) => {
          const valuesArray = keys.map(key => this.getItem(key));
          Promise.all(valuesArray)
            .then(values => {
              const result: [string, string | null][] = values.map(
                (val, index) => [keys[index], val],
              );
              resolve(result);
            })
            .catch(reject);
        })
        .catch(reject);
    });
  }

  /**
   * Deletes all key value pairs
   */
  clear(): Promise<void> {
    return new Promise((resolve, reject) => {
      Keychain.resetGenericPassword()
        .then(() => {
          this.resetCache();
          resolve();
        })
        .catch(reject);
    });
  }
}
