import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import CurrentProvider from "../CurrentContext";
import { ThemeProvider } from "styled-components";
//component imports
import { lightTheme, darkTheme } from "./Themes";
import Homepage from "./Homepage";
import Settings from "./Settings";
import Login from "./Login";
import SignUp from "./SignUp";

const App = () => {
  const [theme, setTheme] = useState("light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <CurrentProvider>
      <BrowserRouter>

        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <GlobalStyles />
          <button onClick={themeToggler}>Switch Theme</button>

          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>

        </ThemeProvider>
      </BrowserRouter>
    </CurrentProvider>
  );
};

export default App;
