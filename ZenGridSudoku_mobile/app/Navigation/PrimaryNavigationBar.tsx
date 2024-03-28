
/* root/components/PrimaryNavigationBar.tsx
 * 
 * This file provides the primary navigation method for
 * the mobile app. Currently, this navigation bar is
 * used to navigate between:
 * 
 * Home       'HomeScreen'
 * Settings   'SettingsScreen'
 * Profile    'ProfileScreen'
 * 
 * Other Screens can be navigated to through
 * Home, Settings, and Profile
 * 
 * Home will be where most content is accessed,
 * such as the Daily Puzzle, Tournaments / Competitive,
 * Leaderboards, (etc.). It will also display a
 * not signed in warning, and contain Login
 * and Signup buttons.
 * 
 * Settings will control general app settings
 * 
 * Profile will contain account management features.
 * The Profile screen will also contain Login
 * and Signup buttons if the user is NOT signed in.
*/

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '@/app/Screens/HomeScreen';
import SettingsScreen from '@/app/Screens/SettingsScreen';
import ProfileScreen from '@/app/Screens/ProfileScreen';
import HomeScreenStack from './HomeScreenStack';

const BottomBar = createBottomTabNavigator();

// This lambda supplies 'screenOptions' to the 'Tab.Navigator' element
const navigationBarOptions = ({ route }: any) => ({

  // This lambda determines the icon for a Screen within the navigation bar
  tabBarIcon: ({ focused, color, size }: any) => {

    // This immedietly evaluated function returns the chosen icon from
    // the encased switch statement, assigning it to 'iconName'
    let iconName: any = function () {
      switch (route.name) {
        case 'Home':
          return focused ? 'grid' : 'grid-outline';
        case 'Profile':
          return focused ? 'person' : 'person-outline';
        case 'Settings':
          return focused ? 'cog' : 'cog-outline';
        default:
          // displays unset icons as '!'
          return focused ? 'alert' : 'alert-outline';
      }
    }()

    return <Ionicons name={iconName} size={size} color={color} />;
  },
  headerShown: false,               // Hide the header
  tabBarActiveTintColor: 'tomato',  // Selected color
  tabBarInactiveTintColor: 'gray',  // Deselected color
})

const PrimaryNavigationBar = () => {
  return (
    <BottomBar.Navigator screenOptions={navigationBarOptions}>
      <BottomBar.Screen name="Home" component={HomeScreenStack} />
      <BottomBar.Screen name="Profile" component={ProfileScreen} />
      <BottomBar.Screen name="Settings" component={SettingsScreen} />
    </BottomBar.Navigator>
  );
}

export default PrimaryNavigationBar;
