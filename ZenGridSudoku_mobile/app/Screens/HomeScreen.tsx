
/* 
 * 
 * 
 * 
*/

import { Link } from 'expo-router';
import React from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import LoginScreen from './LoginScreen';
import HomeScreenStack from '../Navigation/HomeScreenStack';
import { NavigationProp, useNavigation } from '@react-navigation/native';

// Currently trying to figure out the proper type
const HomeScreen = ({navigation}: any) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text onPress={() => navigation.navigate("LoginScreen")}>Home Screen (Click To Login)</Text>
    </View>
  );
}

export default HomeScreen;