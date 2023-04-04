import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import styled from "styled-components";
import {
  AiOutlineCalendar,
  AiOutlineCheckCircle,
  AiOutlineCoffee,
} from "react-icons/ai";
import {CurrentContext} from "../CurrentContext";
// import Patch from "./Patch";

const Profile = () => {
  const [reward, setReward] = useState("");
  const navigate = useNavigate();
  
  const { rewards, setRewards, user, mongoUser } = useContext(CurrentContext);

  const handleClick = (e) => {
    navigate("/settings");
  };

  const handleSubmit = (e) => {
e.preventDefault();
if (reward !== "" ) {
  setRewards([reward, ...rewards]);
  setReward("");

  
  fetch(`/get-user/rewards/${user.email}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        rewards: [rewards],
    }),
  })
    .then((res) => res.json())
    .then((data) => {
   console.log("rewards updated")
    })
    .catch((e) => {
      console.log(e);
    });

  } 
}

  const updateReward = (e) => {
    setReward(e.target.value);
  };

  return (
    <ProfileContainer>
      <UserInfoContainer>
        <Avatar>avatar</Avatar>
        <Username>@username</Username>
        <h3>full name</h3>
        <div>level 8 </div>
        <div>tasks completed: 2398</div>
        <SettingsLink onClick={handleClick}>Settings</SettingsLink>
      </UserInfoContainer>

<RightContainer>

    <RewardForm onSubmit={handleSubmit}>
      Add New Rewards: 
      <RewardInput type="text"
          placeholder="Add a new reward to your list"
          value={reward}
          onChange={updateReward}/>
        <RewardButton type="submit">Add Reward To Collection
          </RewardButton>

    </RewardForm>

      <BadgeFlex>
        <BadgeContainer>
          <Calendar1 size={90} />
          <HideSqaure1>?</HideSqaure1>
        </BadgeContainer>

        <BadgeContainer>
          <Calendar2 size={90} />
          <HideSqaure2>?</HideSqaure2>
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
  );
};

const RightContainer = styled.div`
display: flex;
flex-direction: column; 
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
`;

const RewardInput = styled.input`

`;

const RewardButton = styled.button`
margin-bottom: 5vh; 
`;

export default Profile;
