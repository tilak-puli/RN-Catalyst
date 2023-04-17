import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginContainer from '../screens/Login/LoginContainer';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginContainer} />
  </Stack.Navigator>
);

export default AuthNavigation;
