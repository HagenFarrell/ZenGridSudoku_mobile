import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";

const SignupScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  // Replicate the password validation logic from the web app
  const isPasswordValid = () => {
    return (
      password.length >= 8 &&
      password !== password.toLowerCase() &&
      /[|\\/~^:,;?!&%$@*+]/.test(password)
    );
  };

  const handleSignupPress = async () => {
    // Check if passwords match and meet the security requirements
    if (password !== passwordCheck) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    if (!isPasswordValid()) {
      Alert.alert("Error", "Password does not meet security requirements.");
      return;
    }

    if (email === "" || username === "") {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    try {
      // Construct the request body object
      const requestBody = {
        username: username,
        email: email,
        password: password,
      };

      const response = await axios.post(
        "https://sudokuapp-f0e20225784a.herokuapp.com/api/createuser",
        requestBody
      );

      // Handle the response from the server
      console.log("Signup successful:", response.data);
      Alert.alert(
        "Signup Success",
        "Your account has been successfully created."
      );

    } catch (error) {
      // Handle errors
      if (axios.isAxiosError(error) && error.response) {
        Alert.alert(
          "Signup Failed",
          error.response.data.message || "An error occurred during signup."
        );
      } else {
        Alert.alert(
          "Error",
          "An error occurred during signup. Please try again later."
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Password Confirmation Input */}
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={passwordCheck}
        onChangeText={setPasswordCheck}
        secureTextEntry
      />

      {/* Sign Up Button */}
      <Button title="Sign Up" onPress={handleSignupPress} />
    </View>
  );
};

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

export default SignupScreen;