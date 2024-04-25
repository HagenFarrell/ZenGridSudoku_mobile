/*
 *
 *
 *
 */

import axios, { AxiosError } from "axios";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  TextInput,
  ImageBackground,
} from "react-native";
import { useAuth } from "../Navigation/AuthContext";

// Currently trying to figure out the proper type
const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Use this for error message
  const bannerAnim = useRef(new Animated.Value(-100)).current;

  const handleError = (errorMessage: string) => {
    setIsErrorVisible(true);
    setErrorMessage(errorMessage);
    // Slide in by translating in the Y direction
    Animated.timing(bannerAnim, {
      toValue: 0, // Assuming the visible state is at translation Y of 0
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      hideErrorBanner();
    }, 3000);
  };

  const hideErrorBanner = () => {
    // Slide out by translating in the Y direction
    Animated.timing(bannerAnim, {
      toValue: -100, // Back to the original off-screen position
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setIsErrorVisible(false);
      setErrorMessage("");
    });
  };

  const handleLoginPress = async () => {
    try {
      const response = await axios.post(
        "http://sudokuapp-f0e20225784a.herokuapp.com/api/login",
        {
          email: email,
          password: password,
        }
      );

      login(response.data.id, response.data.Username, response.data.Email);
      navigation.goBack(); // Navigates back to the home/play screen.

    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // Assuming the response.data is an object with a message property
        const message = (axiosError.response.data as { message: string })
          .message;
        handleError(message);
      }
      // Handle other error cases
    }
  };

  return (
    <ImageBackground
      source={require("../imgs/background.jpg")}
      style={styles.backgroundImage}
    >
      {isErrorVisible && (
        <Animated.View
          style={[
            styles.errorBanner,
            { transform: [{ translateY: bannerAnim }] },
          ]}
        >
          <Text style={styles.errorText}>{errorMessage}</Text>
        </Animated.View>
      )}
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
      </View>
      <View style={styles.buttonContainer}>
        {/*Login button*/}
        <TouchableOpacity
          testID="loginButton"
          style={styles.button}
          onPress={handleLoginPress}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Navigation to RegisterScreen*/}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("RegisterScreen")}
        >
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>

        {/* Back button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate("ForgotPassword")}
        >
         <Text style={styles.buttonText}>Forgot password?</Text>
        </TouchableOpacity>
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
    alignItems: "center", // Center text horizontally
    justifyContent: "center", // Center text vertically
  },
  buttonText: {
    color: "black", // Ensures the text color is white
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
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.9)", // More opaque white for inputs
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: "100%", // Ensures the input stretches to fill the container
    height: 50, // Fixed height for all inputs
  },
  title: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  container: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    width: "65%",
  },
  Text: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
  },
  errorBanner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default LoginScreen;
