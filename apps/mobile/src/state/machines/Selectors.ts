import {State} from 'xstate';
import {authMachine} from './Auth';

export const loggedInSelector = (state: State<typeof authMachine>) =>
  state.matches('success');
export const loggingInSelector = (state: State<typeof authMachine>) =>
  state.matches('success');
