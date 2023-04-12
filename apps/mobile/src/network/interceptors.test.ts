import MockAdapter from 'axios-mock-adapter';
import axiosInstance from './index';

const mock = new MockAdapter(axiosInstance);

mock.onGet('/users').reply(config => [200, {requestHeaders: config.headers}]);

mock.onGet('/user').reply(404);

describe('[Network] - [Interceptor]', () => {
  describe('Get request to correct /users URL', () => {
    test('should return 200 status code', async () => {
      const resp = await axiosInstance.get('/users');
      expect(resp.status).toBe(200);
    });
    test('should pass custom headers', async () => {
      const resp = await axiosInstance.get('/users');
      expect(resp.data.requestHeaders['custom-header'] === 'custom');
    });
  });

  describe('Get request to invalid /user URL', () => {
    test('should return error with status 404', async () => {
      try {
        const resp = await axiosInstance.get('/user');
        expect(resp.status).toBe(404);
      } catch (err) {
        expect(err).toEqual(Error('Request failed with status code 404'));
      }
    });
  });
});
