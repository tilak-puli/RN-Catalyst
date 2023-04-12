import {NavigationContainer} from '@react-navigation/native';

import {AuthState} from '../hooks/useAuth';
import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';
import Spinner from '../components/Spinner';

export type NavigationInput = {
  authState: AuthState;
};

const RootNavigation = ({authState}: NavigationInput) => {
  const {loading, userToken} = authState;
  if (loading) {
    return <Spinner fullScreeMode />;
  }
  return (
    <NavigationContainer>
      {userToken ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default RootNavigation;
