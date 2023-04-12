import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { CurrentContext } from "../CurrentContext";
import Loading from "./Loading";
import RewardsPopUp from "./popups/RewardsPopUp";

const TreatYourself = () => {
  const { mongoUser, rewards } = useContext(CurrentContext);


  return (
    <>
      {!mongoUser ? (
        <Loading />
        ) : (
          
          <Container>
            <PopUpHeader>
          Getting stuff done?
            <RewardsPopUp />
            </PopUpHeader>
          <TreatButton
    
            onClick={() => {
              
            
              window.alert(
                `${
                  rewards[
                    Math.floor(Math.random() * rewards.length)
                  ]
                }!`
              );
            }}
          >
            Treat Yourself!
          </TreatButton>
        </Container>
      )}
    </>
  );
};

const TreatButton = styled.button`
  padding: 10px;
  margin: 20px;
  border-radius: 10px;
  font-weight: bold;
  font-size: 0.9em;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding-top: 2vh;
  border: ${({ theme }) => theme.border};
  border-radius: 10px;
`;

const PopUpHeader = styled.div`
display: flex;
align-items: baseline;
gap: 1vw;
justify-content: center;
font-size: 1em;
`

export default TreatYourself;
