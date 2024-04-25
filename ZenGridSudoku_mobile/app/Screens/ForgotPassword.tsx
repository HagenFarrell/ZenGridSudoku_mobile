import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Animated,
} from "react-native";
import axios from "axios";

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const bannerAnim = useRef(new Animated.Value(-100)).current;
  const [isSuccessVisible, setIsSuccessVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const successBannerAnim = useRef(new Animated.Value(-100)).current;

  const handleError = (errorMessage: string) => {
    setIsErrorVisible(true);
    setErrorMessage(errorMessage);
    // Slide in by translating in the Y direction
    Animated.timing(bannerAnim, {
      toValue: 0,
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

  const handleSendLink = async () => {
    try {
      const response = await axios.post(
        "https://sudokuapp-f0e20225784a.herokuapp.com/api/forgotEmail",
        {
          email: email,
        }
      );
      const data = response.data;
      if (data.success) {
        showSuccessBanner("Password reset link sent! Check your email.");

        setTimeout(() => {
          navigation.goBack();
        }, 2000);
        
      } else {
        handleError(data.message);
      }
    } catch (error) {
      alert("Failed to send password reset link");
      console.error("API Error:");
    }
  };

  return (
    <View style={styles.container}>
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
      <Text style={styles.title}>Reset your password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Button title="Send Reset Link" onPress={handleSendLink} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
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
});

export default ForgotPasswordScreen;
