import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeContainer from '../screens/Home/HomeContainer';

const AppNavigationStack = createNativeStackNavigator();

const AppNavigation = () => (
  <AppNavigationStack.Navigator>
    <AppNavigationStack.Screen name="Home" component={HomeContainer} />
  </AppNavigationStack.Navigator>
);

export default AppNavigation;
