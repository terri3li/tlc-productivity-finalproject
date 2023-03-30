import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import CurrentProvider from "../CurrentContext";
// import { ThemeProvider } from "styled-components";
// import { useState } from "react";

// import { lightTheme, darkTheme } from './Themes';
import Homepage from "./Homepage";
import Settings from "./Settings";
import Login from "./Login";
import SignUp from "./SignUp"

const App = () => {

  // const [theme, setTheme] = useState("light");
  // const isDarkTheme = theme === "dark";
  // const toggleTheme = () => setTheme(isDarkTheme ? "light" : "dark");

  return (
    // <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
    <CurrentProvider>
      <BrowserRouter>
      <GlobalStyles/>
      {/* <button onClick={toggleTheme}>
          {isDarkTheme ?
            <span aria-label="Light mode" role="img">🌞</span> :
            <span aria-label="Dark mode" role="img">🌜</span>}
        </button> */}
        <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/treat-yourself" element={<TreatYourself */}
        {/* randomRewards={randomRewards}/>} /> */}
        <Route path="/settings" element={<Settings/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        
        </Routes>
      </BrowserRouter>
    </CurrentProvider>
    // </ThemeProvider>
  );
};

export default App;
