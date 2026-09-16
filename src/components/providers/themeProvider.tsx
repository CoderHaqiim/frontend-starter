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
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  colors: themeColors.light,
  colorVariables: colorVariables,
  toggleTheme: () => undefined,
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

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    window.localStorage.setItem(storageKey, nextTheme);
    window.dispatchEvent(new Event(themeChange));
  };

  return (
    <ThemeContext.Provider value={{ theme, colors, colorVariables, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
