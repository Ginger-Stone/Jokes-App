import React, { createContext, useState, ReactNode } from "react";
import Cookies from "js-cookie";

interface AuthData {
  token: string | undefined;
}

interface AuthContextType {
  token: AuthData;
  updateToken?: () => void;
  removeToken?: () => void;
}

const initialAuthData: AuthData = {
  token: Cookies.get("jokes_app_token"),
};

const initialAuthContextType: AuthContextType = {
  token: initialAuthData,
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>(
  initialAuthContextType
);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [token, setToken] = useState<AuthData>(initialAuthData);

  function generateRandomToken(length: number): string {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let token = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      token += charset[randomIndex];
    }
    return token;
  }

  const updateToken = () => {
    const expirationTime = new Date(new Date().getTime() + 60000); // Current time + 1 minute
    Cookies.set("jokes_app_token", generateRandomToken(16), {
      expires: expirationTime,
    });
    const item = Cookies.get("jokes_app_token");
    console.log(item);

    setToken({ token: item });
  };

  const removeToken = () => {
    Cookies.remove("jokes_app_token");
    setToken({ token: Cookies.get("jokes_app_token") });
  };
  return (
    <AuthContext.Provider value={{ token, updateToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};
