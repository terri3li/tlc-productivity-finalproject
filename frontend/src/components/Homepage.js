import NavBar from "./NavBar";
import Header from "./Header";
import Goals from "./Goals";
import styled from "styled-components";
import Calendar from "./Calendar";
import APICalendar from "./APICalendar";
import ToDoList from "./ToDoList";

const Homepage = () => {
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
          {/* <Calendar /> */}
          <APICalendar />
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
