import { useContext } from "react";
//import components
import { CurrentContext } from "../CurrentContext";
import NavBar from "./NavBar";
import Header from "./Header";
import Goals from "./Goals";
import styled from "styled-components";
import Calendar from "./Calendar";
import ToDoList from "./ToDoList";

const Homepage = () => {

  const { user } = useContext(CurrentContext);

  return (
    <>
      <NavBar />
      <Header />

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
  );
};

export default Homepage;

const MainContainer = styled.div`
  display: flex;
`;

const LeftContainer = styled.div``;

const RightContainer = styled.div``;
