// Import the required components and hooks
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from '@expo/vector-icons/Ionicons';

// Import your screen components
import LoginScreen from './app/Screens/LoginScreen';
import SignupScreen from './app/Screens/SignupScreen';
// ... import other screens

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // Change icon name based on the route.name
            if (route.name === 'Login') {
              iconName = focused ? 'log-in' : 'log-in-outline';
            } else if (route.name === 'Signup') {
              iconName = focused ? 'person-add' : 'person-add-outline';
            } else if (route.name === 'Play') {
              iconName = focused ? 'play-circle' : 'play-circle-outline';
            }
            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Login" component={LoginScreen} />
        <Tab.Screen name="Signup" component={SignupScreen} />

        {/* ... other tabs */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
