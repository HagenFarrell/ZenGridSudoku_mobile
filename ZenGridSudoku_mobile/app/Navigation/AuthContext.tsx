import React, { createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
  userId: string | null;
  username: string | null;
  login: (userId: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProvideProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProvideProps> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Load user details from SecureStore on app boot
    const loadUserDetails = async () => {
      const storedUserId = await SecureStore.getItemAsync("userId");
      const storedUsername = await SecureStore.getItemAsync("username");
      if (storedUserId && storedUsername) {
        setUserId(storedUserId);
        setUsername(storedUsername);
      }
    };

    loadUserDetails();
  }, []);

  const login = async (userId: string, username: string) => {
    try {
      console.log("userId:", userId);
      console.log("username:", username);
      await SecureStore.setItemAsync("userId", userId.toString());
      await SecureStore.setItemAsync("username", username.toString());
      setUserId(userId);
      setUsername(username);
    } catch (error) {
      console.error("Error storing user details...", error);
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("userId");
    await SecureStore.deleteItemAsync("username");
    setUserId(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ userId, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};