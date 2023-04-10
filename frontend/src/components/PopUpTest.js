import Popup from 'reactjs-popup';
import styled from 'styled-components';

const PopUpTest = () => {

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
                              Instructions
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

export default PopUpTest;