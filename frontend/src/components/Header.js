import { useContext } from "react";
import styled from "styled-components";
import { CurrentContext } from "../CurrentContext";

const Header = () => {
  const { user, isAuthenticated } = useContext(CurrentContext);

  let date = new Date();
  let hour = date.getHours();
 
  let timeOfDay = "";
  if (hour >= 0 && hour <= 11) {
    timeOfDay = "Morning";
  } else if (hour >= 12 && hour <= 17) {
    timeOfDay = "Afternoon";
  } else if (hour >= 18 && hour <= 23) {
    timeOfDay = "Evening";
  }

  return (
    <Container>
      {!isAuthenticated ? (
        <Greeting>Good {timeOfDay}, sign in to get productive</Greeting>
      ) : (
        <>
          <Greeting>
            {" "}
            Good {timeOfDay}, {user.nickname}{" "}
          </Greeting>
        </>
      )}
    </Container>
  );
};

const Greeting = styled.h1`
  font-size: 2.5em;
  text-align: center;
  padding: 12px;
  width: 65vw;
  border-radius: 10px;
`;

const Container = styled.div`
display: flex;
justify-content: center`;

export default Header;
