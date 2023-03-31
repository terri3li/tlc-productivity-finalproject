import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import styled from "styled-components";

const Logout = () => {
  const { logout } = useAuth0();

  return (
    <LogOutButton onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </LogOutButton>
  );
};

const LogOutButton = styled.button`
border: solid 1px; 
border-radius: 5px;
padding: 5px 12px 5px 12px;
font-size: 0.95em;
`;

export default Logout;