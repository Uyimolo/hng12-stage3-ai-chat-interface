import { useState, useEffect } from "react";

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Check if theme was previously stored
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      // Check system preference if no saved theme
      if (!savedTheme) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
      return savedTheme;
    }
    return "light"; // Default theme
  });

  useEffect(() => {
    // Update document root class and localStorage when theme changes
    if (typeof window !== "undefined") {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Set a specific theme
  const setSpecificTheme = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
  };

  return {
    theme,
    toggleTheme,
    setTheme: setSpecificTheme,
    isDarkMode: theme === "dark",
  };
};

export default useTheme;
