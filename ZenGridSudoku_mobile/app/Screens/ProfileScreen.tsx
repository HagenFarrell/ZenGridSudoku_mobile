import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useAuth } from "../Navigation/AuthContext"; 

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({
    userId: "",
    username: "",
  });

  const { userId, username } = useAuth(); // Destructure the needed user information

  useEffect(() => {
    const fetchUserInfo = async () => {
      // Retrieve the values from SecureStore and parse them
      const storedUserId = await SecureStore.getItemAsync("userId");
      const storedUsername = await SecureStore.getItemAsync("username");

      if (storedUserId && storedUsername) {
        setUserInfo({
          userId: storedUserId,
          username: storedUsername,
        });
      }
    };

    fetchUserInfo();
  }, [userId, username]);

  // Debugging: Log the retrieved user information
  useEffect(() => {
    console.log(
      "Profile Screen - UserId:",
      userInfo.userId,
      "Username:",
      userInfo.username
    );
  }, [userInfo]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {userInfo.userId ? (
        <>
          <Text>Welcome, {userInfo.username}</Text>
          <Text>Your User ID: {userInfo.userId}</Text>
        </>
      ) : (
        <Text>Please login to view information</Text>
      )}
    </View>
  );
};

export default ProfileScreen;