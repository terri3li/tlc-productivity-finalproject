import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import CurrentProvider from "../CurrentContext";
import { ThemeProvider } from "styled-components";
//component imports
import { lightTheme, darkTheme } from "./Themes";
import Homepage from "./Homepage";
import Settings from "./Settings";
import SignUp from "./SignUp";
import Profile from "./Profile";


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
      

          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/settings" element={<Settings theme={theme} setTheme={setTheme} themeToggler={themeToggler}/>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>

        </ThemeProvider>
      </BrowserRouter>
    </CurrentProvider>
  );
};

export default App;
