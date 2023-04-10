import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { CurrentContext } from "../CurrentContext";
import Loading from "./Loading";

const TreatYourself = () => {
  const { mongoUser } = useContext(CurrentContext);
  // const [mounted, setMounted] = useState(false);
  // const [mongoRewards, setMongoRewards] = useState([]);
  // console.log(mongoRewards);
  let rewardsArray = [];

  return (
    <>
      {!mongoUser ? (
        <Loading />
        ) : (
          
          <Container>
          Getting stuff done?
          <TreatButton
            onClick={() => {
              
              rewardsArray = mongoUser.data.rewards
              console.log(rewardsArray)
              console.log(mongoUser)
              window.alert(
                `${
                  rewardsArray[
                    Math.floor(Math.random() * rewardsArray.length)
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
