import Popup from 'reactjs-popup';
import styled from 'styled-components';

const WeeklyPopUp = () => {

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
                              Weekly To Dos: 
                              You get one of these each week & completing will earn you 50 pts 
                              Tip: It's best to set a bigger to do item here that is going to take some time to complete!
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

export default WeeklyPopUp;