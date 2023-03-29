import { useContext } from "react";
import styled from "styled-components";
import { CurrentContext } from "../CurrentContext";

const Header = () => {
  let date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();
  let time = `${hour}:${min}`;

  let timeOfDay = "";
  if (hour >= 0 && hour <= 11) {
    timeOfDay = "Morning";
  } else if (hour >= 12 && hour <= 17) {
    timeOfDay = "Afternoon";
  } else if (hour >= 18 && hour <= 23) {
    timeOfDay = "Evening";
  }

  return (
    <>
      <Greeting>Good {timeOfDay}, firstName</Greeting>
    </>
  );
};

const Greeting = styled.h1`
  font-size: 3em;
  font-family: cedarville-cursive;
  text-align: center;
`;

export default Header;
