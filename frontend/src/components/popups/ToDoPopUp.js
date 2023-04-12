import Popup from "reactjs-popup";
import styled from "styled-components";

const ToDoPopUp = () => {
  return (
    <div>
      <StyledPopup trigger={<PopUpButton> ? </PopUpButton>} modal nested>
        {(close) => (
          <PopUpContainer>
            <PopUpInfo>
              <div>To Do List:</div>
              You can have as many regular to do tasks as you like here. Complete them as frequently as you wish and receive 5 pts per task.
              <div>Tip: This is a great place to store your smaller goals!</div>
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

export default ToDoPopUp;