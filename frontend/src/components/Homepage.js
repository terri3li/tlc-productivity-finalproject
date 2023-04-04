import { useContext } from "react";
//import components
import { CurrentContext } from "../CurrentContext";

import Header from "./Header";
import Goals from "./Goals";
import styled from "styled-components";

import ToDoList from "./ToDoList";
import TreatYourself from "./TreatYourself";
import HomeCalendar from "./Calendar";
import WeeklyGoals from "./WeeklyGoals";

const Homepage = () => {
  const { user, isAuthenticated } = useContext(CurrentContext);

  return (
    <PageContainer>
      <Header />

      <>
        <MainContainer>

          <FirstContainer>
            <Goals />
            <WeeklyGoals/>
          </FirstContainer>

          <SecondContainer>
            <ToDoList />
          </SecondContainer>

          <ThirdContainer>
         
            <TreatYourself />
            <HomeCalendar />
          </ThirdContainer>

        </MainContainer>
      </>
    </PageContainer>
  );
};

export default Homepage;

const MainContainer = styled.div`
  display: flex;
  gap: 3vw;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FirstContainer = styled.div``;

const SecondContainer = styled.div``;

const ThirdContainer = styled.div``;
