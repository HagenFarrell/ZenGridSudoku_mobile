/*
 *
 *
 *
 */

import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ImageBackground,
} from "react-native";

// Currently trying to figure out the proper type
const RegisterScreen = ({ navigation }: any) => {
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

      if (response.status == 200) {
        Alert.alert(
          "Signup successfull.",
          "Email verification sent. Please check your inbox."
        );
      } else {
        Alert.alert(
          "Signup failed.",
          response.data.message || "An error occurred during signup."
        );
      }
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
    <ImageBackground
      source={require("../imgs/night.jpg")}
      style={styles.backgroundImage}
    >
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
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignupPress}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    color: "black",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
  },
  buttonText: {
    color: 'black', // Ensures the text color is white
    fontSize: 16, // You can adjust the size as needed
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "100%", // Or a fixed width in pixels
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 5,
    padding: 10,
    // Ensure there's no flex property causing dynamic changes in size
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    width: "45%",
  },
  container: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  title: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.9)", // More opaque white for inputs
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: "100%", // Ensures the input stretches to fill the container
    height: 50, // Fixed height for all inputs
  },
});

export default RegisterScreen;
