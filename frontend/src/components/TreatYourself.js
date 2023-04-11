import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { CurrentContext } from "../CurrentContext";
import Loading from "./Loading";
import RewardsPopUp from "./popups/RewardsPopUp";

const TreatYourself = () => {
  const { mongoUser, rewards, setRewards } = useContext(CurrentContext);
  // const [mounted, setMounted] = useState(false);
  // const [mongoRewards, setMongoRewards] = useState([]);
  // console.log(mongoRewards);


  return (
    <>
      {!mongoUser ? (
        <Loading />
        ) : (
          
          <Container>
            <RewardsPopUp />
          Getting stuff done?
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

export default TreatYourself;
