import Popup from 'reactjs-popup';
import styled from 'styled-components';

const ProfileRewardsPopUp = () => {

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
                              Setting Your Rewards:
                                Insert your own personalized rewards here to use when you hit the 'Treat Yourself' button on the main page.
                                When you hit the 'Treat Yourself' button one of your rewards will pop up at random. 
                                Ex. 'Make some tea', 'Take a 30 minute game break', 'Get a bath', etc. 
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

export default ProfileRewardsPopUp;