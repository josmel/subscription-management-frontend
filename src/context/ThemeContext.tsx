import React, { createContext, useState, useMemo, useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";

interface ThemeContextProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
          ...(isDarkMode
            ? {
                background: {
                  default: "#121212",
                  paper: "#1E1E1E",
                },
                text: {
                  primary: "#FFFFFF",
                  secondary: "#B0B0B0",
                },
              }
            : {
                background: {
                  default: "#F5F5F5",
                  paper: "#FFFFFF",
                },
                text: {
                  primary: "#000000",
                  secondary: "#333333",
                },
              }),
        },
        typography: {
          fontFamily: "Roboto, Arial, sans-serif",
        },
        components: {
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiInputBase-input": {
                  color: isDarkMode ? "#FFFFFF" : "#000000", // Color del texto
                },
                "& .MuiInputLabel-root": {
                  color: isDarkMode ? "#B0B0B0" : "#333333", // Color de la etiqueta
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: isDarkMode ? "#B0B0B0" : "#333333", // Color del borde
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: isDarkMode ? "#FFFFFF" : "#000000", // Borde al pasar el cursor
                },
              },
            },
          },
          MuiSelect: {
            styleOverrides: {
              root: {
                color: isDarkMode ? "#FFFFFF" : "#000000", // Color del texto
              },
              icon: {
                color: isDarkMode ? "#FFFFFF" : "#000000", // Icono del selector
              },
            },
          },
        },
      }),
    [isDarkMode]
  );

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles
          styles={{
            body: {
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
              margin: 0,
              fontFamily: theme.typography.fontFamily,
            },
            "*": {
              boxSizing: "border-box",
            },
          }}
        />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeContextProvider");
  }
  return context;
};
