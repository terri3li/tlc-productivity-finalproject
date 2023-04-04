import styled from "styled-components";
import { useContext } from "react";
import { CurrentContext } from "../CurrentContext";

const TreatYourself = () => {

// need to fix. working but having issues on mount 

  const { rewards } = useContext(CurrentContext);
//   const { mongoUser } = useContext(CurrentContext);
// const mongoRewards = mongoUser.data.rewards;
// console.log(mongoRewards);

  return (
    <Container>
      Getting stuff done?
      <TreatButton
        // onClick={() => {
        //   window.alert(
        //     `${mongoRewards[Math.floor(Math.random() * mongoRewards.length)]}!`
        //   );
        // }}
      >
        Treat Yourself!
      </TreatButton>
    </Container>
  );
};

const TreatButton = styled.button`
  padding: 10px;
  margin: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border: ${({ theme }) => theme.border};
`;

export default TreatYourself;
