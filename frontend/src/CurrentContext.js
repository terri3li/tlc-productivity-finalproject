import { createContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { useAuth0 } from "@auth0/auth0-react";
import { FiLoader } from "react-icons/fi";
import styled, { keyframes } from "styled-components";

export const CurrentContext = createContext(null);

const CurrentProvider = ({ children }) => {

  //keeps track of the amount of tasks completed
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [weeklysCompleted, setWeeklysCompleted] = useState(0);
  const [monthlysCompleted, setMonthlysCompleted] = useState(0);

  //sets state for to-do item's 
  const [toDos, setToDos] = useState([]);
  const [monthlyGoal, setMonthlyGoal] = useState("");
  const [weeklyGoal, setWeeklyGoal] = useState("");
  
  //below is used to set up & link auth0 to mongodb
  const [userStatusResponse, setUserStatusResponse] = useState();
  const [mongoUser, setMongoUser] = useState(null);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [mounted, setMounted] = useState(null);
  const [completed, setCompleted] = useState(false);

  //tracks users points, current level & rewards
  const [points, setPoints] = useState(0);
  const [level, setLevel] = useState(0);
  const [rewards, setRewards] = useState(["Snack time"]);

  //nav bar clock
  const currentTime = format(new Date(), "HH:mm a").toLowerCase();

  useEffect(() => {
    if (isAuthenticated) {
      setMounted(true);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (mounted) {
      fetch(`/get-user/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setUserStatusResponse(data.message);
          setMongoUser(data);
          setMounted(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [mounted]);

  useEffect(() => {
    if (userStatusResponse === "Need to add user" || completed) {
      fetch("/new-user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.nickname,
          email: user.email,
          avatar: user.picture,
          toDos: [],
          monthlyToDo: monthlyGoal,
          weeklyToDo: weeklyGoal,
          rewards: [rewards],
          tasksCompleted: tasksCompleted,
          weeklysCompleted: weeklysCompleted,
          monthlysCompleted,
          monthlysCompleted,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setMongoUser(data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      if (isAuthenticated) {
        fetch(`/get-user/${user.email}`)
          .then((res) => res.json())
          .then((data) => {
            setToDos(data.data.toDos);
            setRewards(data.data.rewards);
            setMonthlyGoal(data.data.monthlyToDo);
            setWeeklyGoal(data.data.weeklyToDo);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [userStatusResponse, completed]);

  if (isLoading) {
    return <Spinner size={90} />;
  }

  return (
    <>
      <CurrentContext.Provider
        value={{
          user,
          currentTime,
          tasksCompleted,
          setTasksCompleted,
          completed,
          setCompleted,
          rewards,
          setRewards,
          isAuthenticated,
          mongoUser,
          setMongoUser,
          isLoading,
          toDos,
          setToDos,
          weeklysCompleted,
          setWeeklysCompleted,
          monthlysCompleted,
          setMonthlysCompleted,
          points,
          setPoints,
          level,
          setLevel,
          monthlyGoal,
          setMonthlyGoal,
          weeklyGoal,
          setWeeklyGoal,
        }}
      >
        {children}
      </CurrentContext.Provider>
    </>
  );
};

const spin = keyframes`
from {
  transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;

const Spinner = styled(FiLoader)`
  animation: ${spin} 2s linear infinite;
  margin: 5% 0 0 47%;
  border: none;
`;

export default CurrentProvider;
