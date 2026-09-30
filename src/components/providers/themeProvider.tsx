"use client";

import {
    ColorVariables,
    ColorsMap,
    ThemeType,
    colorVariables,
    getColorVariables,
    themeColors,
} from "@/src/app/design/colors";
import { ReactNode, createContext, useContext, useEffect, useSyncExternalStore } from "react";

type ThemeContextType = {
  theme: ThemeType;
  colors: ColorsMap ;
  colorVariables: ColorVariables;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  colors: themeColors.light,
  colorVariables: colorVariables,
  toggleTheme: () => undefined,
  setTheme: () => undefined,
});

type ThemeProviderProps = {
  children: ReactNode;
}

const storageKey = "theme";
const themeChange = "theme-change";

const readStoredTheme = (): ThemeType => {
  if (typeof window === "undefined") {
    return "light";
  }
  const savedTheme = window.localStorage.getItem(storageKey)
  return savedTheme === "dark" || savedTheme === "light" ? savedTheme : "light";
};

const subscribeToTheme = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(themeChange, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(themeChange, onStoreChange);
  };
};

const getServerTheme = (): ThemeType => "light";

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const theme = useSyncExternalStore<ThemeType>(
    subscribeToTheme,
    readStoredTheme,
    getServerTheme,
  );

  const colors = themeColors[theme];
  const colorVariables = getColorVariables(theme);

  useEffect(() => {
    Object.entries(colorVariables).forEach(([name, value]) => {
      document.documentElement.style.setProperty(name, value);
    });

    document.documentElement.dataset.theme = theme;
  }, [colorVariables, theme]);

  // The saved theme is what every reader of the context follows: the header button
  // flips between the two, and the settings modal picks one of them.
  const setTheme = (nextTheme: ThemeType) => {
    window.localStorage.setItem(storageKey, nextTheme);
    window.dispatchEvent(new Event(themeChange));
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, colors, colorVariables, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
