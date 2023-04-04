import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import CurrentProvider from "../CurrentContext";
import { ThemeProvider } from "styled-components";
import Popup from "reactjs-popup";
//// component imports
import { lightTheme } from "./Themes";
import Homepage from "./Homepage";
import Settings from "./Settings";
import SignUp from "./SignUp";
import Profile from "./Profile";
import NavBar from "./NavBar";
import PopUpTest from "./PopUpTest";

const App = () => {
  const [theme, setTheme] = useState(lightTheme);
  const [font, setFont] = useState("roboto mono");

  return (
    <CurrentProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyles />

          <NavBar />
          <PopUpTest />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route
              path="/settings"
              element={
                <Settings
                  theme={theme}
                  setTheme={setTheme}
                  font={font}
                  setFont={setFont}
                />
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>

        </ThemeProvider>
      </BrowserRouter>
    </CurrentProvider>
  );
};

export default App;
