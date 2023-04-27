import {setGenericPassword, getGenericPassword} from 'react-native-keychain';
import {secureKeyValueStore} from './index';
import SecureKeyValueStore from './SecureKeyValueStore';

const delay = (milliseconds: number, fn: () => void) =>
  new Promise(resolve => {
    setTimeout(async () => {
      await fn();
      resolve(undefined);
    }, milliseconds);
  });

describe('[Storage] - [SecureStorage]', () => {
  const keyValuePair = {key: 'myKey1', value: 'value1'};
  const keyValuePair2 = {key: 'myKey2', value: 'value2'};
  const keyValuePair3 = {key: 'myKey3', value: 'value3'};

  // clearing storage before each test case
  beforeEach(async () => {
    jest.clearAllMocks();
    await secureKeyValueStore.clear();
  });

  test('should resolve successfully when setItem() is called', () =>
    expect(
      secureKeyValueStore.setItem(keyValuePair.key, keyValuePair.value),
    ).resolves.toBe(undefined));

  test('should return the value for given key when getItem() is called', async () => {
    await secureKeyValueStore.setItem(keyValuePair.key, keyValuePair.value);

    await expect(
      secureKeyValueStore.getItem(keyValuePair.key),
    ).resolves.toEqual(keyValuePair.value);
  });

  test('should return null when getItem() is called with non-existing key', () =>
    expect(secureKeyValueStore.getItem('notExist')).resolves.toBeNull());

  test('should return key-value pairs for given keys when multiGet() is called', async () => {
    const expectedAllItems = [
      [keyValuePair.key, keyValuePair.value],
      [keyValuePair3.key, keyValuePair3.value],
    ];

    await secureKeyValueStore.setItem(keyValuePair.key, keyValuePair.value);
    await secureKeyValueStore.setItem(keyValuePair2.key, keyValuePair2.value);
    await secureKeyValueStore.setItem(keyValuePair3.key, keyValuePair3.value);

    await expect(
      secureKeyValueStore.multiGet([keyValuePair.key, keyValuePair3.key]),
    ).resolves.toEqual(expectedAllItems);
  });

  test('should return all key-value pairs when getAllItems() is called', async () => {
    const expectedAllItems = [
      [keyValuePair.key, keyValuePair.value],
      [keyValuePair2.key, keyValuePair2.value],
    ];

    await secureKeyValueStore.setItem(keyValuePair.key, keyValuePair.value);
    await secureKeyValueStore.setItem(keyValuePair2.key, keyValuePair2.value);

    await expect(secureKeyValueStore.getAllItems()).resolves.toEqual(
      expectedAllItems,
    );
  });

  test('should return null when getItem() is called after deletItem() with same key', async () => {
    await secureKeyValueStore.setItem(keyValuePair.key, keyValuePair.value);

    await secureKeyValueStore.deleteItem(keyValuePair.key);

    await expect(
      secureKeyValueStore.getItem(keyValuePair.key),
    ).resolves.toBeNull();
  });

  test('should return empty array when getAllItems() is called after clearing the storage', async () => {
    await secureKeyValueStore.setItem(keyValuePair.key, keyValuePair.value);

    await secureKeyValueStore.clear();

    await expect(secureKeyValueStore.getAllItems()).resolves.toEqual([]);
  });

  test('should return value from cache when getItem() is called after setting value in storage', async () => {
    await secureKeyValueStore.setItem(keyValuePair.key, keyValuePair.value);

    // fetching multiple times with same key
    // and confirming that getGenericPassword method of Keychain is not called every time
    await secureKeyValueStore
      .getItem(keyValuePair.key)
      .then(result => expect(result).toEqual(keyValuePair.value));
    await secureKeyValueStore
      .getItem(keyValuePair.key)
      .then(result => expect(result).toEqual(keyValuePair.value));
    await secureKeyValueStore
      .getItem(keyValuePair.key)
      .then(result => expect(result).toEqual(keyValuePair.value));
    expect(getGenericPassword).toBeCalledTimes(0);
  });

  test('should return cached value at second time when getItem() is called twice just after App launch', async () => {
    await setGenericPassword(keyValuePair.key, keyValuePair.value, {
      service: keyValuePair.key,
    });

    await secureKeyValueStore
      .getItem(keyValuePair.key)
      .then(result => expect(result).toEqual(keyValuePair.value));
    await secureKeyValueStore
      .getItem(keyValuePair.key)
      .then(result => expect(result).toEqual(keyValuePair.value));
    expect(getGenericPassword).toBeCalledTimes(1);
  });

  test('should execute getGenericPassword() once cache is expired after given TTL time', async () => {
    const secureStoreWithCustomTTL = new SecureKeyValueStore(0.01);
    await secureStoreWithCustomTTL.setItem(
      keyValuePair.key,
      keyValuePair.value,
    );

    await secureStoreWithCustomTTL.getItem(keyValuePair.key);

    expect(getGenericPassword).toBeCalledTimes(0);

    // as we are passing TTL 0.01 which is 600 ms
    await delay(610, async () => {
      await secureStoreWithCustomTTL.getItem(keyValuePair.key);
    });

    expect(getGenericPassword).toBeCalledTimes(1);
  });
});
