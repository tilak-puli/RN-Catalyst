import {createContext, PropsWithChildren, useContext} from 'react';
import {InterpreterFrom} from 'xstate';
import {useInterpret} from '@xstate/react';
import {authMachine} from '../../state/machines/Auth';

type GlobalState = {
  authService: InterpreterFrom<typeof authMachine>;
};

export const GlobalContext = createContext({} as GlobalState);

export const GlobalContextProvider = ({children}: PropsWithChildren) => {
  const authService = useInterpret(authMachine, {devTools: __DEV__});

  return (
    // eslint-disable-next-line
    <GlobalContext.Provider value={{authService}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
