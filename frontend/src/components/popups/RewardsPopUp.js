import Popup from 'reactjs-popup';
import styled from 'styled-components';

const RewardsPopUp = () => {

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
                              Rewards:
                                If you've been productive you should reward yourself!

                              Tip: Set your own custom rewards in your profile, if you don't do this then we'll be telling you to snack a lot
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

export default RewardsPopUp;