import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../Navigation/AuthContext";
import axios from "axios";

// Interfaces
interface UserInfo {
  userId: string;
  username: string;
  email: string;
}

interface UserStats {
  easy: number;
  medium: number;
  hard: number;
}

const ProfileScreen: React.FC = () => {
  // User Info State
  const [userInfo, setUserInfo] = useState<UserInfo>({
    userId: "",
    username: "",
    email: "",
  });

  // Stats State
  const [stats, setStats] = useState<UserStats>({
    easy: 0,
    medium: 0,
    hard: 0,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get needed info from AuthContext
  const { userId, username, email } = useAuth();

  useEffect(() => {
    const fetchUserInfoAndStats = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Retrieve user info
        const storedUserId = await SecureStore.getItemAsync("userId");
        const storedUsername = await SecureStore.getItemAsync("username");
        const storedEmail = await SecureStore.getItemAsync("email");

        console.log("from profile, storedUserID:", storedUserId);
        console.log("from profile, storedUsername:", storedUsername);
        console.log("from profile, storedEmail:", storedEmail);

        if (storedUserId && storedUsername && storedEmail) {
          setUserInfo({
            userId: storedUserId,
            username: storedUsername,
            email: storedEmail,
          });

          // Fetch stats
          const response = await axios.post<UserStats>(
            "https://sudokuapp-f0e20225784a.herokuapp.com/api/getUserCompletion",
            { email: storedEmail }
          );

          console.log(response.data.easy);
          console.log(response.data.medium);
          console.log(response.data.hard);
          setStats(response.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.error(
            "Server responded with status code:",
            error.response.status
          );
          console.error("Response data:", error.response.data);
          setError(`Server error: ${error.response.data.message}`);
        } else {
          console.error("Error details:", error);
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfoAndStats();
  }, [userId, username, email]);

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
    padding: 20, // Add some spacing around content
  },
  error: {
    color: "red",
    marginBottom: 15, // Space below the error message
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
