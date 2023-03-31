import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
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

  return (
    <>
      <NavContainer>

        <Clock>{currentTime}</Clock>
        <HomeLink to="/">Dashboard</HomeLink>
        {!isAuthenticated ? (
          <LoginButton onClick={() => loginWithRedirect()}>Log In || Sign Up</LoginButton>
        ) : (
          <>
          <ProfileLink to="/profile">Profile</ProfileLink>
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
  /* border-bottom: solid 2px; */
`;

const ProfileLink = styled(NavLink)`
  text-decoration: none;
  /* border: solid 1px; */
  border-radius: 5px;
  padding: 5px 12px 5px 12px;

`;

const HomeLink = styled(NavLink)`
  text-decoration: none;
  /* border: solid 1px; */
  border-radius: 5px;
  padding: 5px 12px 5px 12px;
`;

const LoginButton = styled.button`
/* border: solid 1px; */
  border-radius: 5px;
  padding: 5px 12px 5px 12px;
  font-size: 0.95em;
`;

const Clock = styled.div`
  font-weight: bold;
  border: ${({ theme }) => theme.border};
  border-radius: 5px;
  padding: 5px 12px 5px 12px;
`;

export default NavBar;
