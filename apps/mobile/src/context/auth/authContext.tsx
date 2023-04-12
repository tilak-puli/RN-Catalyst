import {PropsWithChildren, useContext, createContext} from 'react';
import {AuthMethods} from '../../hooks/useAuth';

const AuthContext = createContext({} as AuthMethods);

interface AuthProviderProps extends PropsWithChildren {
  authMethods: AuthMethods;
}

export const AuthProvider = ({children, authMethods}: AuthProviderProps) => (
  <AuthContext.Provider value={authMethods}>{children}</AuthContext.Provider>
);

export const useAuthContext = () => useContext(AuthContext);
