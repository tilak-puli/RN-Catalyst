// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    '': {type: ''};
    'xstate.init': {type: 'xstate.init'};
  };
  invokeSrcNameMap: {
    login: 'done.invoke.auth.login.progress:invocation[0]';
    logout: 'done.invoke.auth.logout:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    setCreds: 'LOGIN';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    login: 'LOGIN';
    logout: '' | 'LOGOUT';
  };
  matchesStates:
    | 'idle'
    | 'login'
    | 'login.failed'
    | 'login.progress'
    | 'login.success'
    | 'logout'
    | 'takingInput'
    | {login?: 'failed' | 'progress' | 'success'};
  tags: never;
}
