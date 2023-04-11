import Popup from 'reactjs-popup';
import styled from 'styled-components';

const MonthlyPopUp = () => {

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
                              Monthly To Dos: 
                              You get one of these each month & completing will earn you 250 pts 
                              Tip: It's best to set a bigger to do item here that is going to take some time to complete
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

export default MonthlyPopUp;