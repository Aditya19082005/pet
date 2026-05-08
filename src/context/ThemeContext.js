import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const lightTheme = {
  background: "#ffffff",
  text: "#111827",
  card: "#f9fafb",
};

const darkTheme = {
  background: "#111827",
  text: "#f9fafb",
  card: "#1f2937",
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
