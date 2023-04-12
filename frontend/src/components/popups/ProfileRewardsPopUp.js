import Popup from "reactjs-popup";
import styled from "styled-components";

const ProfileRewardsPopUp = () => {
  return (
    <div>
      <StyledPopup trigger={<PopUpButton> ? </PopUpButton>} modal nested>
        {(close) => (
          <PopUpContainer>
            <PopUpInfo>
              <div>Setting Your Rewards:</div>
              Set your own personalized rewards to use on your homepage. When
              you hit the 'Treat Yourself' button one of your rewards will pop
              up at random. Your rewards collection is already started with a
              'Snack Time' reward. Add more here!
              <div>Ex. Take a game break, make a cup of tea, etc.</div>
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

export default ProfileRewardsPopUp;
