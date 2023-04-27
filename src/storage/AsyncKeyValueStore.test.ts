// eslint-disable-next-line
// @ts-ignore
import {getItem} from '@react-native-async-storage/async-storage';
import {asyncKeyValueStore} from './index';

describe('[Storage] - [AsyncStorage]', () => {
  const keyValuePair = {key: 'myKey1', value: 'value1'};
  const keyValuePair2 = {key: 'myKey2', value: 'value2'};
  const keyValuePair3 = {key: 'myKey3', value: 'value3'};

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  test('should resolve successfully when setItem() is called', () =>
    expect(
      asyncKeyValueStore.setItem(keyValuePair.key, keyValuePair.value),
    ).resolves.toBe(undefined)); // Async storage is returning null

  test('should return the value for given key when getItem() is called', async () => {
    await asyncKeyValueStore.setItem(keyValuePair.key, keyValuePair.value);

    await expect(asyncKeyValueStore.getItem(keyValuePair.key)).resolves.toEqual(
      keyValuePair.value,
    );
  });

  test('should return null when getItem() is called with non-existing key', () =>
    expect(asyncKeyValueStore.getItem('notExist')).resolves.toBeNull());

  test('should return key-value pairs for given keys when multiGet() is called', async () => {
    const expectedAllItems = [
      [keyValuePair.key, keyValuePair.value],
      [keyValuePair3.key, keyValuePair3.value],
    ];

    await asyncKeyValueStore.setItem(keyValuePair.key, keyValuePair.value);
    await asyncKeyValueStore.setItem(keyValuePair2.key, keyValuePair2.value);
    await asyncKeyValueStore.setItem(keyValuePair3.key, keyValuePair3.value);

    await expect(
      asyncKeyValueStore.multiGet([keyValuePair.key, keyValuePair3.key]),
    ).resolves.toEqual(expectedAllItems);
  });

  test('should return all key-value pairs when getAllItems() is called', async () => {
    const expectedAllItems = [
      [keyValuePair.key, keyValuePair.value],
      [keyValuePair2.key, keyValuePair2.value],
    ];

    await asyncKeyValueStore.setItem(keyValuePair.key, keyValuePair.value);
    await asyncKeyValueStore.setItem(keyValuePair2.key, keyValuePair2.value);

    await expect(
      asyncKeyValueStore.multiGet([keyValuePair.key, keyValuePair2.key]),
    ).resolves.toEqual(expectedAllItems);
  });

  test('should return null when getItem() is called after deletItem() with same key', async () => {
    await asyncKeyValueStore.setItem(keyValuePair.key, keyValuePair.value);

    await asyncKeyValueStore.deleteItem(keyValuePair.key);

    await expect(
      asyncKeyValueStore.getItem(keyValuePair.key),
    ).resolves.toBeNull();
  });

  test('should return empty array when getAllItems() is called after clearing the storage', async () => {
    await asyncKeyValueStore.setItem(keyValuePair.key, keyValuePair.value);

    await asyncKeyValueStore.clear();

    await expect(asyncKeyValueStore.getAllItems()).resolves.toEqual([]);
  });

  test('should return value from cache when getItem() is called after setting value in storage', async () => {
    await asyncKeyValueStore.setItem(keyValuePair.key, keyValuePair.value);

    // fetching multiple times with same key
    // and confirming that getGenericPassword method of Keychain is not called every time
    await asyncKeyValueStore
      .getItem(keyValuePair.key)
      .then(result => expect(result).toEqual(keyValuePair.value));
    await asyncKeyValueStore
      .getItem(keyValuePair.key)
      .then(result => expect(result).toEqual(keyValuePair.value));
    await asyncKeyValueStore
      .getItem(keyValuePair.key)
      .then(result => expect(result).toEqual(keyValuePair.value));
    expect(getItem).toBeCalledTimes(0);
  });
});
