import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  lightTheme,
  darkTheme,
  dustySunrise,
  mixTape,
  serenityNow,
} from "./Themes";
import { CurrentContext } from "../CurrentContext";

const Settings = ({ theme, setTheme, font, setFont }) => {
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(false);
  const [nameUpdate, setNameUpdate] = useState("");
  const [submitTrigger, setSubmitTrigger] = useState(false);

  const { level, realName, setRealName, user } = useContext(CurrentContext);

  ////---- not working yet or relevent, to be used for theme unlocks
  // useEffect(() => {
  //   if (level >= 5) {
  //     setEnabled(true);
  //   }
  // }, [level]);

  ////----- SUBMIT TO MONGO

  useEffect(() => {
    if (submitTrigger) {
      fetch(`/get-user/real-name/${user.email}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          realName: realName,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("real name updated");
          setSubmitTrigger(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [submitTrigger]);

  ////---- update name for header

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nameUpdate !== "") {
      setRealName(nameUpdate);
      setNameUpdate("");
      setSubmitTrigger(true);
    }
  };

  const updateName = (e) => {
    setNameUpdate(e.target.value);
  };

  return (
    <PageContainer>
      <SelectTheme>Select Site Theme:</SelectTheme>
      <ThemeContainer>
        <Theme onClick={() => setTheme(lightTheme)}>Light</Theme>
        <Theme onClick={() => setTheme(darkTheme)}>Dark</Theme>
        <Theme enabled={enabled} onClick={() => setTheme(dustySunrise)}>
          Dusty Sunrise
        </Theme>

        <Theme enabled={enabled} onClick={() => setTheme(mixTape)}>
          Mix Tape
        </Theme>

        <Theme enabled={enabled} onClick={() => setTheme(serenityNow)}>
          Serenity Now
        </Theme>
      </ThemeContainer>

      <SelectTheme>
        Don't want to be greeted with your email? Tell us your name!
      </SelectTheme>

      <EnterName onSubmit={handleSubmit}>
        <h3>Greeting name:</h3>
        <NameInput type="text" onChange={updateName} value={nameUpdate} />
        {""}

        <NameButton type="submit">Enter</NameButton>
      </EnterName>

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

const NameButton = styled.button`
  padding: 8px;
  border-radius: 5px;
`;

const EnterName = styled.form`
  display: flex;
  gap: 1vw;
  align-items: center;
`;

const NameInput = styled.input`
  width: 20vw;
  height: 4vh;
  border-radius: 5px;
`;

const SelectTheme = styled.h2`
  margin-top: 8vh;
  margin-bottom: 5vh;
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
  width: 50vw;
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

export default Settings;
