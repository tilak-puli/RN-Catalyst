import {NavigationContainer} from '@react-navigation/native';

import {useSelector} from '@xstate/react';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';
import {useGlobalContext} from '../context/global/globalContext';
import {loggedInSelector} from '../state/machines/Selectors';

const RootNavigation = () => {
  const globalContext = useGlobalContext();
  const isLoggedIn = useSelector(globalContext.authService, loggedInSelector);

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default RootNavigation;
