import Popup from "reactjs-popup";
import styled from "styled-components";

const RewardsPopUp = () => {
  return (
    <div>
      <StyledPopup trigger={<PopUpButton> ? </PopUpButton>} modal nested>
        {(close) => (
          <PopUpContainer>
            <PopUpInfo>
              <div> Rewards:</div>
              If you've been productive you should reward yourself!
              <div>Tip: Set your own custom rewards in your profile, if you don't do this then we'll be telling you to snack a lot</div>
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

export default RewardsPopUp;