import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import MockAdapter from 'axios-mock-adapter';
// import MockAdapterType from 'axios-mock-adapter/types';
import axiosInstance from './src/network';

const mockKeychain = {
  SECURITY_LEVEL_ANY: 'MOCK_SECURITY_LEVEL_ANY',
  SECURITY_LEVEL_SECURE_SOFTWARE: 'MOCK_SECURITY_LEVEL_SECURE_SOFTWARE',
  SECURITY_LEVEL_SECURE_HARDWARE: 'MOCK_SECURITY_LEVEL_SECURE_HARDWARE',
};

global.axiosMock = new MockAdapter(axiosInstance);
global.AbortController = jest.fn().mockImplementation(() => ({
  abort: jest.fn(),
  signal: {},
}));

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native-keychain', () => {
  let data = {};
  return {
    ...mockKeychain,
    setGenericPassword: jest.fn(
      (username, password, {service}) =>
        new Promise(resolve => {
          data[service || username] = password;
          resolve(true);
        }),
    ),
    getGenericPassword: jest.fn(
      ({service}) =>
        new Promise(resolve => {
          resolve(
            data[service] !== undefined
              ? {username: service, password: data[service]}
              : false,
          );
        }),
    ),
    resetGenericPassword: jest.fn(
      () =>
        new Promise(resolve => {
          data = {};
          resolve(true);
        }),
    ),
    getAllGenericPasswordServices: jest.fn(
      () =>
        new Promise(resolve => {
          resolve(Object.keys(data));
        }),
    ),
  };
});
