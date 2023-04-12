import {NavigationContainer} from '@react-navigation/native';

import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';

export type NavigationInput = {
  loggedIn: boolean;
};

const RootNavigation = ({loggedIn}: NavigationInput) => (
  <NavigationContainer>
    {loggedIn ? <AppNavigation /> : <AuthNavigation />}
  </NavigationContainer>
);

export default RootNavigation;
