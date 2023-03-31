import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { CurrentContext } from "../CurrentContext";
import Logout from "./Logout";

const NavBar = () => {
  const {isAuthenticated} = useContext(CurrentContext);
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
        {!isAuthenticated ? (
          <button onClick={() => loginWithRedirect()}>Log In || Sign Up</button>
        ) : (
          <ProfileLink to="/profile">Profile</ProfileLink>
        )}

        <h3>{currentTime}</h3>
        {/* <button>Treat Yourself</button> */}
        <h3>Dashboard</h3>
        <Logout/>
      </NavContainer>
    </>
  );
};

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProfileLink = styled(NavLink)`

`;

export default NavBar;
