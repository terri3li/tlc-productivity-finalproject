import { useContext } from "react";
//import components
import { CurrentContext } from "../CurrentContext";

import Header from "./Header";
import MonthlyGoals from "./MonthlyGoals";
import styled from "styled-components";

import ToDoList from "./ToDoList";
import TreatYourself from "./TreatYourself";
import HomeCalendar from "./Calendar";
import WeeklyGoals from "./WeeklyGoals";
import Loading from "./Loading";


const Homepage = () => {
  const { user, isAuthenticated, mongoUser } = useContext(CurrentContext);

  return (
    <>
    <Header />
    {!mongoUser ? (
      <div></div>
      ) : (
        
    <PageContainer>
      <></>
{!isAuthenticated ? (
  <div>
  </div> ) : (

      <>
        <MainContainer>

          <FirstContainer>
            <MonthlyGoals />
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


)}



    </PageContainer>
      )}
      </>
  );
};

export default Homepage;

const MainContainer = styled.div`
  display: flex;
  gap: 3vw;
  margin-right: 5vw;
  margin-left: 5vw;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FirstContainer = styled.div`
display: flex;
flex-direction: column;
gap: 3vh;
`;

const SecondContainer = styled.div``;

const ThirdContainer = styled.div``;
