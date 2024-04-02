import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "@/app/Navigation/AuthContext"; 
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  LoginScreen: undefined;
  // other screens...
};

type PlayScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "LoginScreen">;
};

const PlayScreen: React.FC<PlayScreenProps> = ({ navigation }) => {
  const context = useContext(AuthContext);

  // Check to make sure 
  if(!context)
  {
    return null;
  }

  const { userToken } = context;

  useEffect(() => 
  {
    // If no user token is present, navigate to the LoginScreen
    if (!userToken) {
      navigation.navigate("LoginScreen");
    }
  }, [userToken, navigation]);

  // If the user is logged in (token exists), render the PlayScreen content
  return (
    <View>
      <Text>Welcome to the Play Screen</Text>
    </View>
  );
};

export default PlayScreen;