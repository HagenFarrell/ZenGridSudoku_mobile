/* root/app/index.tsx
 *
 * This file is the entrypoint for the mobile app,
 * with PrimaryNavigationBar as its initial Navigation
 * source, with the HomeScreen as the initial screen
 */

import React, { useEffect } from "react";
import PrimaryNavigationBar from "@/app/Navigation/PrimaryNavigationBar";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "@/app/Navigation/AuthContext";
import * as SecureStore from "expo-secure-store";

/* Testing the behavior of independent={true}
 *
 * To enable switching between different ways of Navigating?
 *
 */

const clearSecureStore = async () => {
  try {
    await SecureStore.deleteItemAsync("userId");
    await SecureStore.deleteItemAsync("username");
    await SecureStore.deleteItemAsync("email");
    console.log("SecureStore cleared on app bootup.");
  } catch (error) {
    console.error("Error clearing SecureStore:", error);
  }
};

const App = () => {
  useEffect(() => {
    clearSecureStore();
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer independent={true}>
        <PrimaryNavigationBar />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;