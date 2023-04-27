import {assign, createMachine} from 'xstate';
import {AuthActions} from '../../api';
import {secureKeyValueStore} from '../../storage';
import {LoginInput} from '../../api/auth';

type AuthContext = {creds: LoginInput};
type AuthEvents = {type: 'LOGIN'; data: LoginInput} | {type: 'LOGOUT'};
type AuthServices = {login: {data: void}; logout: {data: void}};

export const authMachine = createMachine(
  {
    tsTypes: {} as import('./Auth.typegen').Typegen0,
    schema: {
      context: {} as AuthContext,
      events: {} as AuthEvents,
      services: {} as AuthServices,
    },
    predictableActionArguments: true,
    preserveActionOrder: true,
    id: 'auth',
    initial: 'idle',
    context: {
      creds: {
        username: '',
        password: '',
      },
    },
    on: {
      LOGOUT: {
        target: 'logout',
        actions: ['removeCreds'],
      },
    },
    states: {
      idle: {
        always: 'takingInput',
      },
      takingInput: {
        on: {
          LOGIN: {
            target: 'login',
            actions: ['setCreds'],
          },
        },
      },
      login: {
        initial: 'progress',
        states: {
          progress: {
            invoke: {
              src: 'login',
              onDone: 'success',
              onError: 'failed',
            },
          },
          success: {
            type: 'final',
          },
          failed: {
            always: '#auth.logout',
          },
        },
      },
      logout: {
        invoke: {
          src: 'logout',
          onDone: 'idle',
          onError: 'idle',
        },
      },
    },
  },
  {
    actions: {
      setCreds: assign({
        creds: (_context, event) => ({
          username: event?.data?.username,
          password: event?.data?.password,
        }),
      }),
      removeCreds: assign({
        creds: () => ({
          username: '',
          password: '',
        }),
      }),
    },
    services: {
      login: async context => {
        const {accessToken} = await AuthActions.login(context.creds);
        await secureKeyValueStore.setItem('accessToken', accessToken);
      },
      logout: async () => {
        await secureKeyValueStore.deleteItem('accessToken');
      },
    },
  },
);
