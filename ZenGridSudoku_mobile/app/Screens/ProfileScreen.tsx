import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "@/app/Navigation/AuthContext";

const ProfileScreen: React.FC = () => {
  const { userInfo } = useAuth();

  if (!userInfo) {
    return <Text>Please login to view profile information.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.info}>Username: {userInfo.username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  info: {
    fontSize: 16,
  },
});

export default ProfileScreen;