
/* 
 * 
 * 
 * 
*/

import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text } from 'react-native';

// Currently trying to figure out the proper type
const RegisterScreen = ({navigation}: any) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text onPress={() => {navigation.goBack()}} >Register Screen (Click me to go back)</Text>
    </View>
  );
}

export default RegisterScreen;
