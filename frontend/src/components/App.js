import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import CurrentProvider from "../CurrentContext";
import { ThemeProvider } from "styled-components";
//component imports
import { lightTheme, darkTheme, dustySunrise } from "./Themes";
import Homepage from "./Homepage";
import Settings from "./Settings";
import SignUp from "./SignUp";
import Profile from "./Profile";
import NavBar from "./NavBar";


const App = () => {
  const [theme, setTheme] = useState(lightTheme);

  return (
    <CurrentProvider>
      <BrowserRouter>

        <ThemeProvider theme={theme}>
         
          <GlobalStyles />
      
<NavBar/>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/settings" element={<Settings theme={theme} setTheme={setTheme} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>

        </ThemeProvider>
      </BrowserRouter>
    </CurrentProvider>
  );
};

export default App;
