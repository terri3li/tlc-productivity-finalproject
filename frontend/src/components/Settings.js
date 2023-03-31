import { useState } from "react";
import styled from "styled-components";
import { lightTheme, darkTheme, dustySunrise, moonlightBytes } from "./Themes";

const Settings = ({ theme, setTheme }) => {

  return (
    <>
      <SelectTheme>Select Site Theme:</SelectTheme>
	  <ThemeContainer>
      <Theme onClick={()=>setTheme(lightTheme)}>Light</Theme>
      <Theme onClick={()=>setTheme(darkTheme)}>Dark</Theme>
      <Theme onClick={()=>setTheme(moonlightBytes)}>MoonLight Bytes</Theme>
      <Theme onClick={()=>setTheme(dustySunrise)}>Dusty Sunrise</Theme>
	  </ThemeContainer>
    </>



  );
};

const ChangeTheme = styled.div``;

const SelectTheme = styled.h2`
margin-top: 8vh;
`;

const ThemeContainer = styled.div`
display: flex;
justify-content: space-around;
width: 40vw;
height: 9vh;

 
`;

const Theme = styled.button`
padding: 20px;
font-size: 1em;
border-radius: 5px;
&:hover {
	cursor: pointer;
}
`

export default Settings;
