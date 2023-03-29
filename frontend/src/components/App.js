import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import CurrentProvider from "../CurrentContext";
// import randomRewards from "../data"; 

import Homepage from "./Homepage";
import TreatYourself from "./TreatYourself";
import Settings from "./Settings"

const App = () => {

  return (
    <CurrentProvider>
      <BrowserRouter>
      <GlobalStyles/>
        <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/treat-yourself" element={<TreatYourself */}
        {/* randomRewards={randomRewards}/>} /> */}
        <Route path="/settings" element={<Settings/>} />
        </Routes>
      </BrowserRouter>
    </CurrentProvider>
  );
};

export default App;
