/*
 *
 *
 *
 */

import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  TextInput,
  ImageBackground,
} from "react-native";
import * as SecureStore from "expo-secure-store";

// Currently trying to figure out the proper type
const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginPress = async () => {
    try {
      const response = await axios.post(
        "http://sudokuapp-f0e20225784a.herokuapp.com/api/login",
        {
          email: email,
          password: password,
        }
      );

      console.log("Login successful:", response.data);
      Alert.alert("Login Success", "You have logged in successfully!");

      await SecureStore.setItemAsync("userId", response.data.id);
      await SecureStore.setItemAsync("username", response.data.Username);
      console.log("User ID and username stored.");

      navigation.goBack();
      // Navigate or update state as needed here
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Assuming the response.data is an object with a message property
        const message = (axiosError.response.data as { message: string })
          .message;
        Alert.alert("Login Failed", message || "An unexpected error occurred");
      }
      // Handle other error cases
    }
  };

  return (
    <ImageBackground
      source={require('../imgs/leaves.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLoginPress} />
        <Button
          title="Register"
          onPress={() => navigation.navigate("RegisterScreen")}
        ></Button>
        <Button title="Tempback" onPress={() => navigation.goBack()}></Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%', // Or a fixed width in pixels
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
    padding: 10,
    // Ensure there's no flex property causing dynamic changes in size
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // More opaque white for inputs
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: '100%', // Ensures the input stretches to fill the container
    height: 50, // Fixed height for all inputs
  },
  container: {
    width: '90%',
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  Text: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
});

export default LoginScreen;
