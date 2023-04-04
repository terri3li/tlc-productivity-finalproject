import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FiHome } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { HiOutlineSparkles } from "react-icons/hi2";
import { CurrentContext } from "../CurrentContext";
import Logout from "./Logout";

const NavBar = () => {
  const { isAuthenticated } = useContext(CurrentContext);
  const [currentTime, setCurrentTime] = useState();
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

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
  clearInterval(1000);

  return (
    <>
      <NavContainer>
        <Clock>{currentTime}</Clock>

        {!isAuthenticated ? (
          <LoginButton onClick={() => loginWithRedirect()}>
            Log In || Sign Up
          </LoginButton>
        ) : (
          <>
            <HomeLink
              onClick={() => {
                navigate("/");
              }}
            />
            <ProfileLink
              onClick={() => {
                navigate("/profile");
              }}
            />
            <Logout />
          </>
        )}
      </NavContainer>
    </>
  );
};

const NavContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 3vh;
  padding-bottom: 3vh;
`;

const HomeLink = styled(FiHome)`
  border: none;
  width: 5vw;
  height: 5vh;
  cursor: pointer;
`;

const ProfileLink = styled(VscAccount)`
  border: none;
  width: 5vw;
  height: 5vh;
  cursor: pointer;
`;

const LoginButton = styled.button`
  border-radius: 5px;
  padding: 5px 12px 5px 12px;
  font-size: 1em;
`;

const Clock = styled.div`
  border: none;
  font-size: 1.3em;
`;

export default NavBar;
