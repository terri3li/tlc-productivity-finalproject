import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { lightTheme, darkTheme, dustySunrise, moonlightBytes } from "./Themes";

const Settings = ({ theme, setTheme, font, setFont }) => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <SelectTheme>Select Site Theme:</SelectTheme>
      <ThemeContainer>
        <Theme onClick={() => setTheme(lightTheme)}>Light</Theme>
        <Theme onClick={() => setTheme(darkTheme)}>Dark</Theme>
        <Theme onClick={() => setTheme(moonlightBytes)}>MoonLight Bytes</Theme>
        <Theme onClick={() => setTheme(dustySunrise)}>Dusty Sunrise</Theme>
      </ThemeContainer>

      <BackButton
        onClick={() => {
          navigate("/profile");
        }}
      >
        Back to profile
      </BackButton>
    </PageContainer>
  );
};

const SelectTheme = styled.h2`
  margin-top: 8vh;
  margin-bottom: 5vh;
`;

const SelectFont = styled.h2`
  margin-top: 8vh;
`;

const Font = styled.button`
  padding: 20px;
  font-size: 1em;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const PageContainer = styled.div`
  margin-left: 5vw;
`;

const BackButton = styled.button`
  margin-top: 10vh;
  text-decoration: none;
  border-radius: 5px;
  padding: 8px 15px 8px 15px;
  font-size: 1em;
`;

const ThemeContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
`;

const LightTheme = styled.button`
  background: #f1f1f1;
  color: black;
  padding: 20px;
  border: solid 4px #d1d1d1;
  outline: solid 2px gray;
  font-size: 1em;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const DarkTheme = styled.button`
  background: #1c2833;
  color: #f9ff9d;
  padding: 20px;
  border: solid 4px #b8fffe;
  outline: solid 2px #1c2833;
  font-size: 1em;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const MoonTheme = styled.button`
  background: #051e3d;
  color: #c4caff;
  padding: 20px;
  border: solid 4px #ffd7f8;
  outline: solid 2px #051e3d;
  font-size: 1em;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const DustyTheme = styled.button`
  background: #c06c84;
  color: #f8b195;
  padding: 20px;
  border: solid 4px #355c7d;
  outline: solid 2px #f8b195;
  font-size: 1em;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
  }
`;

export default Settings;
