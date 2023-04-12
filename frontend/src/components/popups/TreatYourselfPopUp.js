import Popup from "reactjs-popup";
import styled from "styled-components";
import { useContext } from "react";
import { CurrentContext } from "../../CurrentContext";

////---- currently not working or being used, need to transfer window alert in TreatYourself here


const TreatYourselfPopUp = () => {

    const {rewards} = useContext(CurrentContext);

  return (
    <div>
      <StyledPopup trigger={<PopUpButton> ? </PopUpButton>} modal nested>
        {(close) => (
          <PopUpContainer>
            <PopUpInfo>
              <div>Your Reward:</div>
              {      `${
                  rewards[
                    Math.floor(Math.random() * rewards.length)
                  ]
                }!`}
             
            </PopUpInfo>
            <div>
              <button onClick={() => close()}>Close</button>
            </div>
          </PopUpContainer>
        )}
      </StyledPopup>
    </div>
  );
};

const PopUpContainer = styled.div`
  border: ${({ theme }) => theme.border};
  border-radius: 10px;
  padding: 1vw;
`;

const StyledPopup = styled(Popup)`
  &-overlay {
    background: ${({ theme }) => theme.body};
  }
  &-content {
    width: 50vw;
  }
`;

const PopUpInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vw;
  padding: 1vw;
`;

const PopUpButton = styled.button`
  border-radius: 10px;
`;

export default TreatYourselfPopUp;