import {AuthActions} from './auth';

describe('[API] - [Auth]', () => {
  const mockedLoginInput = {
    username: 'someUser',
    password: 'password',
  };
  const mockedLoginResponse = {
    accessToken: 'dummy_token',
    name: 'someUser',
  };

  afterEach(() => {
    global.axiosMock.reset();
  });

  describe('login API', () => {
    test('should resolve login response on success', async () => {
      global.axiosMock.onPost('/login').reply(200, mockedLoginResponse);

      const result = await AuthActions.login(mockedLoginInput);

      expect(global.axiosMock.history.post[0].url).toEqual('/login');
      expect(result).toEqual(mockedLoginResponse);
    });

    test('should reject with error on failure ', async () => {
      global.axiosMock.onPost('/login').networkErrorOnce();
      await expect(AuthActions.login(mockedLoginInput)).rejects.toBeTruthy();
    });
  });

  describe('User API', () => {
    const userUrl = `https://jsonplaceholder.typicode.com/users/1`;
    test('should resolve login response on success', async () => {
      global.axiosMock.onGet(userUrl).reply(200, mockedLoginResponse);

      const result = await AuthActions.getUser(1);

      expect(global.axiosMock.history.get[0].url).toEqual(userUrl);
      expect(result).toEqual(mockedLoginResponse);
    });
    test('should reject with error on failure ', async () => {
      global.axiosMock.onGet(userUrl).networkErrorOnce();
      await expect(AuthActions.getUser(1)).rejects.toBeTruthy();
    });
  });
});
