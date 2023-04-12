import Popup from "reactjs-popup";
import styled from "styled-components";

const MonthlyPopUp = () => {
  return (
    <div>
      <StyledPopup trigger={<PopUpButton> ? </PopUpButton>} modal nested>
        {(close) => (
          <PopUpContainer>
            <PopUpInfo>
              <div> Monthly To Dos: </div>
              You get one of these each month & completing will earn you 250 pts
              <div>
              
                Tip: It's best to set a bigger item here that is going to
                take some time to complete!
              </div>
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

export default MonthlyPopUp;