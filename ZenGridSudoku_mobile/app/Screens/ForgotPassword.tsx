import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Animated,
  ImageBackground,
  TouchableOpacity,
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
      if (response.status == 200) {
        showSuccessBanner(data.message);

        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      } else {
        handleError(data.message);
      }
    } catch (error) {
      handleError("Failed to send password reset link");
    }
  };

  return (
    <ImageBackground
      source={require("../imgs/pass.jpg")}
      style={styles.backgroundImage}
    >
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
        <View style={styles.header}>
          <Text style={styles.headerText}>Reset your password!</Text>
        </View>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={handleSendLink}>
          <Text style={styles.buttonText}>Send Reset Link</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "100%",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "120%",
    padding: 15,
    backgroundColor: "#0572a1", // Consistent green theme
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderColor: "#000",
    borderRadius: 5,
    borderWidth: 1.5,
  },
  button: {
    backgroundColor: "#0572a1",
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
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

export default ForgotPasswordScreen;
