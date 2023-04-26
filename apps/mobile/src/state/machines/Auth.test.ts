import {interpret} from 'xstate';
import {authMachine} from './Auth';
import {AuthActions} from '../../api';
import {secureKeyValueStore} from '../../storage';

const ACCESS_TOKEN = 'DUMMY_TOKEN';

jest.mock('../../api', () => ({
  AuthActions: {
    login: jest.fn(() => Promise.resolve({accessToken: ACCESS_TOKEN})),
  },
}));
AuthActions.login = AuthActions.login as jest.MockedFunction<
  typeof AuthActions.login
>;

jest.mock('../../storage', () => ({
  secureKeyValueStore: {
    setItem: jest.fn(),
    deleteItem: jest.fn(),
  },
}));

describe('[Machines] - [Auth]', () => {
  beforeEach(async () => {
    jest.clearAllMocks();
  });

  test('should be in `taking Input` state at init', () => {
    const authService = interpret(authMachine).start();

    expect(authService.getSnapshot().matches('takingInput')).toBeTruthy();
  });

  test('should handle Login event when on takingInput state', async () => {
    const creds = {username: 'user-name', password: '12345'};
    const authService = authMachine.transition('takingInput', {
      type: 'LOGIN',
      data: creds,
    });

    expect(authService.matches('login.progress')).toBeTruthy();
    expect(authService.context).toEqual({creds});
  });

  test('should call login service and save token on LOGIN event', done => {
    const creds = {username: 'user-name', password: '12345'};
    const authService = interpret(authMachine).onTransition(state => {
      if (state.matches('login.success')) {
        expect(AuthActions.login).toBeCalledWith(creds);
        expect(secureKeyValueStore.setItem).toBeCalledWith(
          'accessToken',
          ACCESS_TOKEN,
        );
        done();
      }
    });

    authService.start();
    authService.send({
      type: 'LOGIN',
      data: creds,
    });
  });

  test('should call login service and go back to taking on LOGIN event failure', done => {
    const creds = {username: 'user-name', password: '12345'};
    AuthActions.login.mockImplementation(jest.fn(() => Promise.reject()));

    const authService = interpret(authMachine).onTransition(state => {
      if (state.matches('logout')) {
        expect(AuthActions.login).toBeCalledWith(creds);
        done();
      }
    });

    authService.start();
    authService.send({
      type: 'LOGIN',
      data: creds,
    });
  });

  test('should move to logout state and remove creds on Logout', async () => {
    const authService = authMachine.transition('login.success', {
      type: 'LOGOUT',
    });

    expect(authService.matches('logout')).toBeTruthy();
    expect(authService.context).toEqual({
      creds: {
        password: '',
        username: '',
      },
    });
  });

  test('should remove accessToken and credson Logout', done => {
    const creds = {username: 'user-name', password: '12345'};
    const authService = interpret(authMachine).onTransition(state => {
      if (state.matches('logout')) {
        expect(secureKeyValueStore.deleteItem).toBeCalledWith('accessToken');
        expect(state.context).toEqual({
          creds: {
            password: '',
            username: '',
          },
        });
        done();
      }
    });

    authService.start();
    authService.send({
      type: 'LOGIN',
      data: creds,
    });
    authService.send({type: 'LOGOUT'});
  });
});
