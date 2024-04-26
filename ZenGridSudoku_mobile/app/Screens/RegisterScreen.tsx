/*
 *
 *
 *
 */

import axios from "axios";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
  ImageBackground,
} from "react-native";

// Currently trying to figure out the proper type
const RegisterScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Use this for error message
  const bannerAnim = useRef(new Animated.Value(-100)).current;
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const successBannerAnim = useRef(new Animated.Value(-100)).current;

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

  const showSuccessBanner = (message: string) => {
    setIsSuccessVisible(true);
    setSuccessMessage(message);

    // Slide in the success banner
    Animated.timing(successBannerAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Hide the banner after some time
    setTimeout(() => {
      hideSuccessBanner();
    }, 3000);
  };

  const hideSuccessBanner = () => {
    // Slide out the success banner
    Animated.timing(successBannerAnim, {
      toValue: -100,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setIsSuccessVisible(false);
      setSuccessMessage("");
    });
  };

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
      handleError("Passwords do not match.");
      return;
    }

    if (!isPasswordValid()) {
      handleError("Password does not meet security requirements.");
      return;
    }

    if (email === "" || username === "") {
      handleError("All fields are required.");
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
        showSuccessBanner(
          "Signup successful, check your inbox for verification email!"
        );
      } else {
        handleError(response.data.message);
      }
    } catch (error) {
      // Handle errors
      if (axios.isAxiosError(error) && error.response) {
        handleError(error.response.data.message);
      } else {
        handleError("Error: An error occurred during signup.");
      }
    }
  };

  return (
    <ImageBackground
      source={require("../imgs/night.jpg")}
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
      {isSuccessVisible && (
        <Animated.View
          style={[
            styles.successBanner,
            { transform: [{ translateY: successBannerAnim }] },
          ]}
        >
          <Text style={styles.successText}>{successMessage}</Text>
        </Animated.View>
      )}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Signup</Text>
        </View>

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
          autoCapitalize="none"
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
        <TouchableOpacity
          testID="signup-button"
          style={styles.button}
          onPress={handleSignupPress}
        >
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
    backgroundColor: "#4CAF50", // A more vibrant green color for action buttons
    borderRadius: 20,
    borderWidth: 2, // Remove border for a cleaner look
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginVertical: 10, // Adds space between buttons
    width: "80%", // Ensures buttons are uniformly sized
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Adds subtle elevation for material design feel
  },
  buttonText: {
    color: "white", // Ensures the text color is white
    fontSize: 13, // You can adjust the size as needed
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
    marginRight: 110,
    width: "45%",
  },
  container: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  title: {
    color: "white",
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
  successBanner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    zIndex: 2,
  },
  successText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  header: {
    padding: 20,
    marginTop: 0,
    backgroundColor: "#4CAF50", // Use the primary color for coherence
    width: "120%", // Full width to stretch across the screen
    alignItems: "center", // Center align text
    marginBottom: 30, // Spacing from the top element
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity:0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  }
});

export default RegisterScreen;
