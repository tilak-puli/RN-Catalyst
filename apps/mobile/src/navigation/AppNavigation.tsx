import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home/Home';

const AppNavigationStack = createNativeStackNavigator();

const AppNavigation = () => (
  <AppNavigationStack.Navigator>
    <AppNavigationStack.Screen name="Home" component={Home} />
  </AppNavigationStack.Navigator>
);

export default AppNavigation;
