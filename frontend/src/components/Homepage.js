import { useContext } from "react";
//import components
import { CurrentContext } from "../CurrentContext";

import Header from "./Header";
import Goals from "./Goals";
import styled from "styled-components";
import Calendar from "./Calendar";
import ToDoList from "./ToDoList";

const Homepage = () => {
  const { user, isAuthenticated } = useContext(CurrentContext);

  return (
    <>
      <Header />

      {!isAuthenticated ? (
          <></>
        ) : (
          <>
      <MainContainer>
        <LeftContainer>
          <Goals />
          <ToDoList />
        </LeftContainer>

        <RightContainer>
          <Calendar />
        </RightContainer>
      </MainContainer>
          
        </>
        )}
    </>
  );
};

export default Homepage;

const MainContainer = styled.div`
  display: flex;
`;

const LeftContainer = styled.div``;

const RightContainer = styled.div``;
