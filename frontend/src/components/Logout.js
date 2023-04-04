import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";
import { FiLogOut } from "react-icons/fi";

const Logout = () => {
  const { logout } = useAuth0();

  return (
    <LogOutButton
      onClick={() => {
        logout({ logoutParams: { returnTo: window.location.origin } });
        window.localStorage.removeItem(
          "loggedInUser"
        );      
      }
      }
    >
      Log Out
    </LogOutButton>
  );
};

const LogOutButton = styled(FiLogOut)`
  border: none;
  width: 5vw;
  height: 5vh;
  cursor: pointer;
`;

export default Logout;
