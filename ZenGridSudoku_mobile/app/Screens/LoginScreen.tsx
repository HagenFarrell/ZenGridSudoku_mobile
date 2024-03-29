
/* 
 * 
 * 
 * 
*/

import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, TextInput } from 'react-native';

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
      <Button title="Register" onPress={() => navigation.navigate("RegisterScreen")}></Button>
      <Button title="Tempback" onPress={() => navigation.goBack()}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default LoginScreen;
