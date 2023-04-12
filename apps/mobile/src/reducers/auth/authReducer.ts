import type {AuthState} from '../../hooks/useAuth';
import {AuthActionTypes} from './authActions';

export type AuthAction = {
  type: string;
  token?: string | null;
};

const authReducer = (prevState: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionTypes.RESTORE_TOKEN:
      return {
        ...prevState,
        userToken: action.token,
        loading: false,
      };
    case AuthActionTypes.LOG_IN:
      return {
        ...prevState,
        userToken: action.token,
        loading: false,
      };
    case AuthActionTypes.LOG_OUT:
      return {
        ...prevState,
        userToken: null,
        loading: false,
      };
    case AuthActionTypes.SET_LOADING_TRUE:
      return {
        ...prevState,
        loading: true,
      };
    case AuthActionTypes.SET_LOADING_FALSE:
      return {
        ...prevState,
        loading: false,
      };
    default:
      return {
        ...prevState,
      };
  }
};

export default authReducer;
