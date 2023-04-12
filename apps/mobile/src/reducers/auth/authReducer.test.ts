import {AuthState} from '../hooks/useAuth';
import {AuthActionTypes} from './authActions';
import authReducer, {AuthAction} from './authReducer';

describe('[Reducer] - [AuthReducer]', () => {
  const initialState: AuthState = {
    userToken: null,
  };
  let state = initialState;

  beforeEach(() => {
    state = initialState;
  });
  test('should return initial state', () => {
    expect(
      authReducer(state, {
        type: 'UNDEFINED',
      } as AuthAction),
    ).toEqual(initialState);
  });
  test('should handle RESTORE_TOKEN action', () => {
    state = authReducer(state, {
      type: AuthActionTypes.RESTORE_TOKEN,
      token: 'dummy_token',
    } as AuthAction);
    expect(state.userToken).toBe('dummy_token');
  });
  test('should handle LOGIN action', () => {
    state = authReducer(state, {
      type: AuthActionTypes.LOG_IN,
      token: 'login_token',
    } as AuthAction);
    expect(state.userToken).toBe('login_token');
  });
  test('should handle LOGOUT action', () => {
    state = authReducer(state, {
      type: AuthActionTypes.LOG_OUT,
    } as AuthAction);
    expect(state.userToken).toBeNull();
  });
});
