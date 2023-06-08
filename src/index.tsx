import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CurrentPageLimitContextProvider } from "./context/currentPageLimitContext";
import { AuthContextProvider } from "./context/authContext";
import { ThemeProvider } from "./context/themeContext";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeProvider>
        <CurrentPageLimitContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CurrentPageLimitContextProvider>
      </ThemeProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
