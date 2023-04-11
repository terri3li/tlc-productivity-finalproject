import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import {
  AiOutlineCalendar,
  AiOutlineCheckCircle,
  AiOutlineCoffee
} from "react-icons/ai";
import {  CgGirl } from "react-icons/cg"
import Loading from "./Loading";
import ProfileRewardsPopUp from "./popups/ProfileRewardsPopUp";
import { CurrentContext } from "../CurrentContext";

const Profile = () => {
  const [reward, setReward] = useState("");
  const navigate = useNavigate();

  const {
    rewards,
    setRewards,
    points,
    setPoints,
    level,
    setLevel,
    user,
    tasksCompleted,
    weeklysCompleted,
    monthlysCompleted,
    mongoUser,
  } = useContext(CurrentContext);

  // console.log(monthlysCompleted)

  const handleClick = (e) => {
    navigate("/settings");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reward !== "") {
      const newRewards = [reward, ...rewards];

      fetch(`/get-user/rewards/${user.email}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rewards: newRewards,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setRewards(newRewards);
          
          setReward("");
          console.log("rewards updated");
        })
        .catch((e) => {
          console.log(e);
        });
      console.log(rewards);
    }
  };

  const updateReward = (e) => {
    setReward(e.target.value);
  };

  // let points =
    // tasksCompleted * 5 + weeklysCompleted * 50 + monthlysCompleted * 250;
  // let level = 0;

  // if (points >= 50 && points < 125) {
  //   level = 1;
  // } else if (points >= 125 && points < 225) {
  //   level = 2;
  // } else if (points >= 225 && points < 350) {
  //   level = 3;
  // } else if (points >= 350 && points < 500) {
  //   level = 4;
  // } else {
  //   level = 5;
  // }

// useEffect(() => {

//   return(

//     <>
//     </>
//   )
// }, [])


//   let hideSquare1 = false;

//   if (tasksCompleted >= 10) {
//     let hideSquare1 = true;
//   }

//   if (tasksCompleted >= 15) {
//     const hideSquare2 = true;
//   }

  // if (tasksCompleted >= 10) {
  //   const hideSquare1 = true;
  // }

  // if (tasksCompleted >= 10) {
  //   const hideSquare1 = true;
  // }
console.log(mongoUser);
  return (
    <>
      {!mongoUser ? (
        <Loading />
      ) : (
        <ProfileContainer>
          <UserInfoContainer>
            <AddAvatar/>
            <Username>@{mongoUser.data.username}</Username>
            <div>level {mongoUser.data.level} </div>
            <div>points: {mongoUser.data.points}</div>
            <div>to do's completed: {mongoUser.data.tasksCompleted}</div>
            <div>weeklys completed: {mongoUser.data.weeklysCompleted}</div>
            <div>monthlys completed: {mongoUser.data.monthlysCompleted}</div>

            <SettingsLink onClick={handleClick}>Settings</SettingsLink>
          </UserInfoContainer>

          <RightContainer>
              Rewards:
            <RewardContainer>
              <ProfileRewardsPopUp />
            <RewardForm onSubmit={handleSubmit}>
              <InputAndButton>
              <RewardInput
                type="text"
                placeholder="Add a new reward to your list"
                value={reward}
                onChange={updateReward}
              />
              <RewardButton type="submit">
                Add Reward To Collection
                {/* add pop up for user to see their current rewards
        stretch: edit rewards */}
              </RewardButton>
              </InputAndButton>
            </RewardForm>
            </RewardContainer>

              Achievements:
            <BadgeFlex>
              <BadgeContainer>
                <Calendar1 size={90} />
                <HideSqaure1
                  // style={{
                  //   visibility: hideSquare1 ? "hidden" : "visible",
                  // }}
                >
                  ?
                </HideSqaure1>
              </BadgeContainer>

              <BadgeContainer>
                <Calendar2 size={90} />
                <HideSqaure2 >?</HideSqaure2>
              </BadgeContainer>

              <BadgeContainer>
                <Checkmark size={90} />
                <HideSqaure3>?</HideSqaure3>
              </BadgeContainer>

              <BadgeContainer>
                <CoffeeCup size={90} />
                <HideSqaure4>?</HideSqaure4>
              </BadgeContainer>
            </BadgeFlex>
          </RightContainer>
        </ProfileContainer>
      )}
    </>
  );
};


const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5vh;
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
  `

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
`;

const RewardButton = styled.button`
  margin-bottom: 5vh;
  width: 25vw;
  border-radius: 5px;
`;

const InputAndButton = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
gap: 1vh;
margin-top: 2vh;

`;

export default Profile;
