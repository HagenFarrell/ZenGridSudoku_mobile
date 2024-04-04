import React, { useState, useEffect, createContext, ReactNode, useContext } from "react";
import * as SecureStore from "expo-secure-store";

interface userData {
  id: string;
  username: string;
  token: string;
}

type AuthContextType = {
  userToken: string | null;
  setUserToken: (token: string | null) => void;
  userInfo: userData | null;
  setUserInfo: (info: any) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<any>(null);

  const loadToken = async () => {
    const token = await SecureStore.getItemAsync("userToken");
    if (token) {
      setUserToken(token);
    }
  };

  useEffect(() => {
    loadToken();
  }, []);

  const login = (userData: userData) => {
    setUserToken(userData.token);
    setUserInfo({ id: userData.id, username: userData.username });
    // Store the user data in SecureStore as well
    SecureStore.setItemAsync("userInfo", JSON.stringify(userData));
    console.log("Stored user info in SecureStore");
  };

  return (
    <AuthContext.Provider
      value={{ userToken, setUserToken, userInfo, setUserInfo }}
    >
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