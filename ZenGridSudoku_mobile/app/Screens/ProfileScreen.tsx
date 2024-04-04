import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({ id: "", username: "" });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = await SecureStore.getItemAsync("userId");
      const username = await SecureStore.getItemAsync("username");

      if (userId && username) {
        setUserInfo({ id: userId, username: username });
      } else {
        console.log("User not logged in or information not stored.");
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      {userInfo.username && (
        <Text style={styles.info}>Hello, {userInfo.username}</Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
  },
});

export default ProfileScreen;