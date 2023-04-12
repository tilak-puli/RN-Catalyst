import MockAdapter from 'axios-mock-adapter/types';

declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var axiosMock: MockAdapter;

  namespace jest {
    interface Matchers<R> {
      toHaveStyleRule(property: string, value?: Value, options?: Options): R;
    }
  }
  declare module '*.png' {
    const value: import('react-native').ImageSourcePropType;
    export default value;
  }
  declare module '*.jpg' {
    const value: import('react-native').ImageSourcePropType;
    export default value;
  }
}
