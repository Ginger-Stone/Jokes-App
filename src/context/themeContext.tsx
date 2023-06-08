import React, { Dispatch, ReactNode, SetStateAction } from "react";
import { THEMES, Theme, ThemeMode } from "../types/Theme";

interface ThemeContextProps {
  themeMode: ThemeMode;
  theme: Theme;
  toggleThemeMode?: () => void;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  themeMode: "light",
  theme: THEMES["light"],
});

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeContextProviderProps) => {
  const [currentTheme, setCurrentTheme] = React.useState<ThemeMode>("light");

  function toggleThemeMode() {
    const currentMode = currentTheme === "dark" ? "light" : "dark";
    setCurrentTheme(currentMode);
  }

  return (
    <ThemeContext.Provider
      value={{
        themeMode: currentTheme,
        theme: THEMES[currentTheme],
        toggleThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ThemeContext);
