import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    green: {
      main: "#2DB855",
      light: "#E7FAEC",
      dark: "#168134ff",
      contrastText: "#fff",
    },
    blue: {
      main: "#1F81DF",
      light: "#68b1f6ff",
      dark: "#145999ff",
      contrastText: "#fff",
    },
    indigo: {
      main: "#4665EF",
      light: "#94a6f4ff",
      dark: "#213bb0ff",
      contrastText: "#fff",
    },
    red: {
      main: "#FC4749",
      light: "#ffa7a8ff",
      dark: "#ba1d20ff",
      contrastText: "#fff",
    },
    orange: {
      main: "#FF7220",
      light: "#FFF2E3",
      dark: "#bb5418ff",
      contrastText: "#fff",
    },
  },
});

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <StrictMode>
      <App />
    </StrictMode>
  </ThemeProvider>
);
