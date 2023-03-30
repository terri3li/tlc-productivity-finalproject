import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CurrentContext } from "../CurrentContext";
import Logout from "./Logout";

const NavBar = () => {
  // const {currentTime} = useContext(CurrentContext)
  const [currentTime, setCurrentTime] = useState();
  const navigate = useNavigate();
  

  const clock = () => {
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let amPm = "am";

    if (hour >= 12) {
      amPm = "pm";
    }

    hour = hour < 10 ? "0" + hour : hour;
    if (hour === "00") {
      hour = 12;
    }
    min = min < 10 ? "0" + min : min;
    setCurrentTime(`${hour}:${min} ${amPm}`);
    return;
  };
  setInterval(clock, 1000);

const Login = (e) => {
  navigate("/login")
}

  return (
    <>
      <NavContainer>
        {localStorage ? (
          <button onClick={Login}>Log In || Sign Up</button>
        ) : (
          <button>Profile</button>
        )}

        <h3>{currentTime}</h3>
        {/* <button>Treat Yourself</button> */}
        <h3>Rank</h3>
        <Logout/>
      </NavContainer>
    </>
  );
};

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default NavBar;
