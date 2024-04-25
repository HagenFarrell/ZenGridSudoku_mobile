import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../Navigation/AuthContext";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const ProfileScreen: React.FC = () => {
  const [userInfo, setUserInfo] = useState({
    userId: "",
    username: "",
    email: "",
  });
  const [stats, setStats] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { userId, username, email } = useAuth();

  // Function to fetch user info and stats
  const fetchUserInfoAndStats = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const storedUserId = await SecureStore.getItemAsync("userId");
      const storedUsername = await SecureStore.getItemAsync("username");
      const storedEmail = await SecureStore.getItemAsync("email");

      if (storedUserId && storedUsername && storedEmail) {
        setUserInfo({
          userId: storedUserId,
          username: storedUsername,
          email: storedEmail,
        });

        const response = await axios.post(
          "https://sudokuapp-f0e20225784a.herokuapp.com/api/getUserCompletion",
          {
            email: storedEmail,
          }
        );

        setStats(response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Hook to run the fetch function when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchUserInfoAndStats();
      return () => {};
    }, [userId, username, email])
  );

  useEffect(() => {
    if (!userId) {
      setUserInfo({
        userId: "",
        username: "",
        email: "",
      });
      setStats({
        easy: 0,
        medium: 0,
        hard: 0,
      });
      setError(null); // Reset any errors as well
    }
  }, [userId]);

  return (
    <View style={styles.backgroundContainer}>
      <Image
        style={styles.backgroundImage}
        source={require("../imgs/background.jpg")}
      />
      <View style={styles.container}>
        {isLoading && <Text>Loading...</Text>}
        {error && <Text style={styles.error}>Error: {error}</Text>}
        {!isLoading && !error && (
          <>
            <Text style={styles.heading}>Welcome, {userInfo.username}</Text>
            <Text style={styles.statsHeading}>Puzzle Stats:</Text>
            <View style={styles.statRow}>
              <View style={[styles.statContainer, styles.easy]}>
                <Text>Easy: {stats.easy + "/50"}</Text>
              </View>
              <View style={[styles.statContainer, styles.medium]}>
                <Text>Medium: {stats.medium + "/50"}</Text>
              </View>
              <View style={[styles.statContainer, styles.hard]}>
                <Text>Hard: {stats.hard + "/50"}</Text>
              </View>
            </View>
          </>
        )}
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={useAuth().logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: "100%",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.14)",
  },
  error: {
    color: "red",
    marginBottom: 15,
  },
  heading: {
    fontSize: 27,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statsHeading: {
    fontWeight: "bold",
    marginTop: 25,
    fontSize: 24,
    marginBottom: 3,
  },
  statRow: {
    flexDirection: "row", // Arrange child elements horizontally
    height: "25%",
    width: "43%",
    justifyContent: "space-between", // Distribute containers evenly
  },
  statContainer: {
    width: "75%",
    height: "100%",
    borderRadius: 50, // Adjust for squared corners or use 40 for a circle
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  easy: {
    backgroundColor: "green",
  },
  medium: {
    backgroundColor: "yellow",
  },
  hard: {
    backgroundColor: "#d94c38",
  },
  // Add these to your existing styles object
  backgroundContainer: {
    flex: 1,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  logoutButton: {
    backgroundColor: "#4CAF50", // Using the green color for consistency
    borderRadius: 25, // More pronounced rounded corners
    borderWidth: 2,
    paddingVertical: 10, // Adequate padding for touchability
    paddingHorizontal: 20, // Horizontal padding for better width management
    alignSelf: "center", // Ensure the button is centered in its container
    marginTop: 20, // Space from other elements
    width: "80%", // Relative width for consistency across devices
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android: subtle shadow for a "lifted" effect
  },
  logoutText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center", // Ensure text is centered within the button
  },
});

export default ProfileScreen;
