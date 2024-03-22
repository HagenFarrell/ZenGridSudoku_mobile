import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  Play: undefined;
  // add other routes here
};

// Define navigation prop types for the HomeScreen
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

// Assuming you have the HomeScreenNavigationProp type defined as shown earlier
const HomeScreen: React.FC = () => {
  // Use the useNavigation hook to get the navigation prop with proper typing
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Button title="Log In" onPress={() => navigation.navigate("Login")} />
      <Button title="Sign Up" onPress={() => navigation.navigate("Signup")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // styles
});

export default HomeScreen;
