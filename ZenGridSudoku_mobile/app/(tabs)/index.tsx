import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '@/app/Screens/HomeScreen'; 
import LoginScreen from '@/app/Screens/LoginScreen';
import SignupScreen from '@/app/Screens/SignupScreen';
import PlayScreen from '@/app/Screens/PlayScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
              case 'Play':
                iconName = focused ? 'play-circle' : 'play-circle-outline';
                break;
              // Add other cases for other tabs if necessary
            }
            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
        initialRouteName="Home" // Set the initial route to Home
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Play" component={PlayScreen} />
        {/* Only show Home and Play in the bottom tab navigator */}
      </Tab.Navigator>
  );
}

export default App;
