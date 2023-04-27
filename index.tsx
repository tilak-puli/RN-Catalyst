/**
 * @format
 */

import {AppRegistry} from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import {inspect} from 'react-native-flipper-xstate';
import {name as appName} from './app.json';
import App from './App';

if (__DEV__) {
  inspect();
}

AppRegistry.registerComponent(appName, () => App);
