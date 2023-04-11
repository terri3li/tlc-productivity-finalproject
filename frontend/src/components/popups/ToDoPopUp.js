import Popup from 'reactjs-popup';
import styled from 'styled-components';

const ToDoPopUp = () => {

    // document.body.style.opacity = 0.5

    return (
      <div>
          <Popup trigger=
              {<button> ? </button>}
              modal nested>
              {
                  close => (
                      <PopUpContainer>
                        
                          <div>
                              To Do List:
                              You can have as many regular to do tasks as you like here. Complete them as frequently as you wish and receive 5 pts per task.
                              Tip: This is a great place to store your smaller goals!
                          </div>
                          <div>
                              <button onClick=
                                  {() => close()}>
                                      Close
                              </button>
                          </div>
                      </PopUpContainer>
                  )
              }
          </Popup>
      </div>
  )
};

const PopUpContainer = styled.div`
border: ${({ theme }) => theme.border};
`;

export default ToDoPopUp;