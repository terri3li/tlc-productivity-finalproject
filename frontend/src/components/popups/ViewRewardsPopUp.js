import Popup from "reactjs-popup";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { CurrentContext } from "../../CurrentContext";

const ViewRewardsPopUp = () => {
  const { mongoUser, rewards, setRewards, user } = useContext(CurrentContext);
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  

    ////----- DELETE/UPDATE ON MONGO

    useEffect(() => {
      if (deleteTrigger) {
        fetch(`/get-user/rewards/${user.email}`, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rewards: rewards,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("rewards updated (deleted)");
            setDeleteTrigger(false);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }, [deleteTrigger]);

  const handleDelete = (id) => {
    const deleteReward = rewards.filter((reward) => reward.id !== id);
    setRewards([...deleteReward]);
    setDeleteTrigger(true);
  };

  return (
    <div>
      <StyledPopup
        trigger={<PopUpButton> View Rewards </PopUpButton>}
        modal
        nested
      >
        {(close) => (
          <PopUpContainer>
            {!mongoUser ? (
              <div></div>
            ) : (
              <>
                <PopUpInfo>
                  <div> Current Rewards: </div>
                  <ul>
                    {rewards.map((reward) => {
                      return (
                        <RewardContainer>
                          <Reward key={reward.id}>
                            {reward.reward}
                          </Reward>
                          <Delete onClick={() => handleDelete(reward.id)}>delete</Delete>
                        </RewardContainer>
                      );
                    })}
                  </ul>
                </PopUpInfo>
                <div>
                  <button onClick={() => close()}>Close</button>
                </div>
              </>
            )}
          </PopUpContainer>
        )}
      </StyledPopup>
    </div>
  );
};

const Reward = styled.li`
  border: none;
`;

const RewardContainer = styled.div`
display: flex;
gap: 2vw;
padding: 0.75vh;
`;

const Delete = styled.button``;

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
  border: none;
`;

const PopUpButton = styled.button`
  margin-bottom: 5vh;
  width: 15vw;
  height: 7vh;
  border-radius: 5px;
  font-size: 0.9em;
`;

export default ViewRewardsPopUp;
