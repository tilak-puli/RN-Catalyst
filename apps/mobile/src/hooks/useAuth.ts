import {useCallback, useEffect, useReducer, useMemo} from 'react';
import {secureKeyValueStore} from '../storage';
import {AuthActions} from '../api';
import {AuthActionTypes} from '../reducers/auth/authActions';
import authReducer from '../reducers/auth/authReducer';

export type AuthState = {
  userToken?: string | null;
  loading: boolean;
};

type LogInInput = {
  username: string;
  password: string;
};

export type AuthMethods = {
  logIn?: (data: LogInInput) => Promise<void>;
  logOut?: () => void;
};

export type UseAuthHookOutput = {
  authState: AuthState;
  authMethods: AuthMethods;
};

export default function useAuth(): UseAuthHookOutput {
  const [authState, dispatch] = useReducer(authReducer, {
    loading: true,
  });

  const bootstrapAsync = useCallback(async () => {
    try {
      const userToken = await secureKeyValueStore.getItem('accessToken');
      dispatch({type: AuthActionTypes.RESTORE_TOKEN, token: userToken});
    } catch (e) {
      dispatch({type: AuthActionTypes.LOG_OUT, token: null});
    }
  }, []);

  useEffect(() => {
    bootstrapAsync();
  }, [bootstrapAsync]);

  const logOut = () => {
    secureKeyValueStore.deleteItem('accessToken');
    dispatch({type: AuthActionTypes.LOG_OUT, token: null});
  };

  const authMethods: AuthMethods = useMemo(
    () => ({
      logIn: async data => {
        try {
          dispatch({type: AuthActionTypes.SET_LOADING_TRUE});
          const {accessToken} = await AuthActions.login(data);
          secureKeyValueStore.setItem('accessToken', accessToken);
          dispatch({type: AuthActionTypes.LOG_IN, token: accessToken});
        } catch (error) {
          logOut();
        }
      },
      logOut,
    }),
    [],
  );

  return {
    authState,
    authMethods,
  };
}
