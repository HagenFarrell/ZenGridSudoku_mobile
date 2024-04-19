import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
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

  return (
    <View style={styles.container}>
      {isLoading && <Text>Loading...</Text>}
      {error && <Text style={styles.error}>Error: {error}</Text>}
      {!isLoading && !error && (
        <>
          <Text style={styles.heading}>Welcome, {userInfo.username}</Text>
          <Text>Your User ID: {userInfo.userId}</Text>
          <Text>Your email: {userInfo.email}</Text>
          <Text style={styles.statsHeading}>Puzzle Stats:</Text>
          <Text>Easy Puzzles Solved: {stats.easy}</Text>
          <Text>Medium Puzzles Solved: {stats.medium}</Text>
          <Text>Hard Puzzles Solved: {stats.hard}</Text>
        </>
      )}
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
  error: {
    color: "red",
    marginBottom: 15,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  statsHeading: {
    marginTop: 20,
    fontSize: 18,
    marginBottom: 5,
  },
});

export default ProfileScreen;