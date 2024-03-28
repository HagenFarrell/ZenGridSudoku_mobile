
/* 
 * 
 * 
 * 
*/

import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, Button } from 'react-native';

// Currently trying to figure out the proper type
const LoginScreen = ({navigation}: any) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text onPress={() => {navigation.goBack()}} >Login Screen (Click me to go back)</Text>
      <Button title="No Account? Clicke me to Sign Up!" onPress={() => navigation.navigate("RegisterScreen")} />
    </View>
  );
}

export default LoginScreen;
