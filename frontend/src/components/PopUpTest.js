import Popup from 'reactjs-popup';

const PopUpTest = () => {
    return (
      <div>
          <Popup trigger=
              {<button> ? </button>}
              modal nested>
              {
                  close => (
                      <div>
                          <div>
                              Instructions
                          </div>
                          <div>
                              <button onClick=
                                  {() => close()}>
                                      Close
                              </button>
                          </div>
                      </div>
                  )
              }
          </Popup>
      </div>
  )
};

export default PopUpTest;