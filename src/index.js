// src/index.js
import React from "react";
import ReactDOM from "react-dom/client"; // Updated for React 18+
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TaskProvider } from "./context/TaskContext"; // Import TaskProvider
import App from "./App"; // Import App component

// Create a custom MUI theme
const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" }, // Blue
    secondary: { main: "#f50057" }, // Pink
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h5: { fontWeight: 700 },
  },
});

// For React 18+ (createRoot API)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <TaskProvider>
      <App />
    </TaskProvider>
  </ThemeProvider>,
);
