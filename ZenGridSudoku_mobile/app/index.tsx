/* root/app/index.tsx
 *
 * This file is the entrypoint for the mobile app,
 * with PrimaryNavigationBar as its initial Navigation
 * source, with the HomeScreen as the initial screen
 */

import React from "react";
import PrimaryNavigationBar from "@/app/Navigation/PrimaryNavigationBar";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "@/app/Navigation/AuthContext";

/* Testing the behavior of independent={true}
 *
 * To enable switching between different ways of Navigating?
 *
 */

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer independent={true}>
        <PrimaryNavigationBar />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
