import NavBar from "./NavBar";
import ToDo from "./ToDo";
import Header from "./Header";
import Goals from "./Goals";
import styled from "styled-components";
import Calendar from "./Calendar";
import APICalendar from "./APICalendar";

const Homepage = () => {
  return (
    <>
      <NavBar />
      <Header />

      <MainContainer>
        <LeftContainer>
          <Goals />
          <ToDo />
        </LeftContainer>

        <RightContainer>
          {/* <Calendar /> */}
          <APICalendar/>
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
