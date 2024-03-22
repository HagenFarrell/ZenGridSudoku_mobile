import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '@/app/Screens/LoginScreen'; 
import SignupScreen from '@/app/Screens/SignupScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;