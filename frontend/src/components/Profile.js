import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import {
  AiOutlineCalendar,
  AiOutlineCheckCircle,
  AiOutlineCoffee,
} from "react-icons/ai";
import { CgGirl } from "react-icons/cg";
import Loading from "./Loading";
import ProfileRewardsPopUp from "./popups/ProfileRewardsPopUp";
import AchievementsPopUp from "./popups/AchievementsPopUp";
import { CurrentContext } from "../CurrentContext";
import ViewRewardsPopUp from "./popups/ViewRewardsPopUp";

const Profile = () => {
  const [reward, setReward] = useState("");
  const [rewardsTrigger, setRewardsTrigger] = useState(false);
  const navigate = useNavigate();
  
  ////---- square 4 not set up yet (part of stretch)
  const [hideSquare1, setHideSquare1] = useState(false);
  const [hideSquare2, setHideSquare2] = useState(false);
  const [hideSquare3, setHideSquare3] = useState(false);
  const [hideSquare4, setHideSquare4] = useState(false);

 

  const {
    rewards,
    setRewards,
    points,
    setPoints,
    user,
    mongoUser,
    setMongoUser,
    level, 
    setLevel
  } = useContext(CurrentContext);

  const handleClick = (e) => {
    navigate("/settings");
  };

  ////---- getting user info on mount to ensure pts and levels update 
  useEffect(() => {
    fetch(`/get-user/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMongoUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


 ////----- Update Mongo Rewards 
  useEffect(() => {
    if (rewardsTrigger) {
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
          setRewardsTrigger(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [rewardsTrigger]);



  ////---- set points once MongoUser loaded
  useEffect(() => {
    if (mongoUser) {
      setPoints(
        mongoUser.data.tasksCompleted * 5 +
          mongoUser.data.weeklysCompleted * 50 +
          mongoUser.data.monthlysCompleted * 250
      );
      if (mongoUser.data.weeklysCompleted >= 1) {
        setHideSquare1(true);
      }
      if (mongoUser.data.monthlysCompleted >= 1) {
        setHideSquare2(true);
      }
      if (mongoUser.data.tasksCompleted >= 10) {
        setHideSquare3(true);
      }
      // if (mongoUser.data.weeklysCompleted > 1) {
      //   setHideSquare4(true);
      // }
    }
  }, [mongoUser]);


  ////--- SUBMIT rewards 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (reward !== "") {
      setRewards([{ id: Math.floor(Math.random() * 8888888), reward }, ...rewards]);
      setReward("");
      setRewardsTrigger(true);
    }
  };

  const updateReward = (e) => {
    setReward(e.target.value);
  };

  if (points >= 50 && points < 125) {
    setLevel(1)
  } else if (points >= 125 && points < 225) {
    setLevel(2)
  } else if (points >= 225 && points < 350) {
    setLevel(3)
  } else if (points >= 350 && points < 500) {
    setLevel(4)
  } else if (points > 500) {
    setLevel(5)
  } 

  return (
    <>
      {!mongoUser ? (
        <Loading />
      ) : (
        <ProfileContainer>
          <UserInfoContainer>
            <AddAvatar />
            <Username>@{mongoUser.data.username}</Username>
            <div>level {level} </div>
            <div>points: {points}</div>
            <div>to do's completed: {mongoUser.data.tasksCompleted}</div>
            <div>weeklys completed: {mongoUser.data.weeklysCompleted}</div>
            <div>monthlys completed: {mongoUser.data.monthlysCompleted}</div>

            <SettingsLink onClick={handleClick} level={level}>Settings</SettingsLink>
          </UserInfoContainer>

          <RightContainer>
            <RewardsHeader>
              <ProfileRewardsPopUp />
              Rewards:
            </RewardsHeader>
            <RewardContainer>
              <RewardForm onSubmit={handleSubmit}>
                <InputAndButton>
                  <RewardInput
                    type="text"
                    placeholder="Add a new reward to your list"
                    value={reward}
                    onChange={updateReward}
                  />
                  <ButtonContainer>
                  <ViewRewardsPopUp/>
                  <RewardButton type="submit">
                    Add Reward To Collection
                  </RewardButton>
                  </ButtonContainer>
                </InputAndButton>
              </RewardForm>
            </RewardContainer>
            

            <AchievementsHeader>
              <AchievementsPopUp />
              Achievements (get things done to unlock these!):
            </AchievementsHeader>
            <BadgeFlex>
              <BadgeContainer>
                <Calendar1 size={90} />
                <HideSqaure1
                  style={{
                    visibility: hideSquare1 ? "hidden" : "visible",
                  }}
                >
                  ?
                </HideSqaure1>
              </BadgeContainer>

              <BadgeContainer>
                <Calendar2 size={90} />
                <HideSqaure2
                  style={{
                    visibility: hideSquare2 ? "hidden" : "visible",
                  }}
                >
                  ?
                </HideSqaure2>
              </BadgeContainer>

              <BadgeContainer>
                <Checkmark size={90} />
                <HideSqaure3
                  style={{
                    visibility: hideSquare3 ? "hidden" : "visible",
                  }}
                >
                  ?
                </HideSqaure3>
              </BadgeContainer>

              <BadgeContainer>
                <CoffeeCup size={90} />
                <HideSqaure4
                  style={{
                    visibility: hideSquare4 ? "hidden" : "visible",
                  }}
                >
                  ?
                </HideSqaure4>
              </BadgeContainer>
            </BadgeFlex>
          </RightContainer>
        </ProfileContainer>
      )}
    </>
  );
};

const ButtonContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5vh;
`;

const RewardsHeader = styled.div`
  display: flex;
  gap: 1vw;
`;

const AchievementsHeader = styled.div`
  display: flex;
  gap: 1vw;
`;

const RewardContainer = styled.div`
  border: solid 1px;
  border-radius: 10px;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProfileContainer = styled.div`
  display: flex;
  margin-top: 10vh;
  justify-content: space-evenly;
  margin-bottom: 10vh;
  margin-top: 4vh;
`;

const Avatar = styled.div``;

const Username = styled.h1`
  border: none;
  background: none;
`;

const SettingsLink = styled.button`
  margin-top: 40px;
  text-decoration: none;
  border-radius: 5px;
  width: 9vw;
  padding: 8px 10px 8px 10px;
  font-size: 1em;
`;

const AddAvatar = styled(CgGirl)`
  border: none;
  width: 50%;
  height: 50%;
  margin-left: 3vw;
`;

const Calendar1 = styled(AiOutlineCalendar)`
  border: none;
  width: 75%;
  height: 75%;
  position: absolute;
  z-index: 1;
`;

const Calendar2 = styled(AiOutlineCalendar)`
  border: none;
  width: 75%;
  height: 75%;
  position: absolute;
`;

const Checkmark = styled(AiOutlineCheckCircle)`
  border: none;
  width: 75%;
  height: 75%;
  position: absolute;
`;

const CoffeeCup = styled(AiOutlineCoffee)`
  border: none;
  width: 75%;
  height: 75%;
  position: absolute;
`;

const BadgeContainer = styled.div`
  position: relative;
  width: 125px;
  height: 125px;
`;

const BadgeFlex = styled.div`
  display: flex;
  gap: 10px;
  border: solid 1px;
  padding: 1vw;
  border-radius: 10px;
`;

const HideSqaure1 = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.header};
  width: 125px;
  height: 125px;
  z-index: 5;
  border-radius: 20px;
  color: ${({ theme }) => theme.text};
  font-size: 4em;
  z-index: 2;
`;

const HideSqaure2 = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.header};
  width: 125px;
  height: 125px;
  z-index: 5;
  border-radius: 20px;
  color: ${({ theme }) => theme.text};
  font-size: 4em;
`;

const HideSqaure3 = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.header};
  width: 125px;
  height: 125px;
  z-index: 5;
  border-radius: 20px;
  color: ${({ theme }) => theme.text};
  font-size: 4em;
`;

const HideSqaure4 = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.header};
  width: 125px;
  height: 125px;
  z-index: 5;
  border-radius: 20px;
  color: ${({ theme }) => theme.text};
  font-size: 4em;
`;

const RewardForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2vh;
`;

const RewardInput = styled.input`
  width: 30vw;
  border-radius: 5px;
  padding: 0.5vw;
  font-size: 0.9em;
`;

const RewardButton = styled.button`
  margin-bottom: 5vh;
  width: 15vw;
  height: 7vh;
  border-radius: 5px;
  font-size: 0.9em;
`;

const InputAndButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2vh;
  margin-top: 2vh;
`;

export default Profile;
