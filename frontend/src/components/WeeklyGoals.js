import { useContext, useEffect, useState } from "react";
import { CurrentContext } from "../CurrentContext";
import { setDay } from "date-fns";
import styled from "styled-components";
import { format } from "date-fns";

const WeeklyGoals = () => {
  const [daysLeftWeek, setDaysLeftWeek] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState(null);
  const [currentWeek, setCurrentWeek] = useState("");
  const [weeklyUpdate, setWeeklyUpdate] = useState("");
  const [editWeekly, setEditWeekly] = useState(0);

  let date = new Date();
  let month = date.getMonth();
  let day = date.getDate();
  let weekday = date.getDay();
  let year = date.getFullYear();
  let first = date.getDate() - date.getDay();
  let sundayDate = format(new Date(date.setDate(first)), "do");

  const whichMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    setDaysLeftWeek(6 - weekday);
  }, []);

  const handleSubmitWeekly = (e) => {
    e.preventDefault();

    if (editWeekly) {
      // const updatedMonthlyGoal =
      // // setToDos(updatedToDos);
      // // setEditToDo(0);
      // // setToDo("");
      // return;
    }

    setWeeklyGoal(weeklyUpdate);
    setWeeklyUpdate("");
  };

  const handleEdit = (e) => {
    setWeeklyUpdate("test");
    setEditWeekly(weeklyGoal);
  };

  // const setWeekly = () => {
  //   if (weeklyGoal) {
  //     return weeklyGoal;
  //   } else {
  //     return <input type="text" />;
  //   }
  // };


  const updateWeekly = (e) => {
    setWeeklyUpdate(e.target.value);
  };

  return (
    <GoalContainer>
      <WeeklyContainer>
        <WeeklyHeader>
          <h2>
            goal for the week of sunday,{" "}
            {whichMonth[month].toLowerCase() + " " + sundayDate}:{" "}
          </h2>
          <WeeklyDays> days left to complete: {daysLeftWeek}</WeeklyDays>
        </WeeklyHeader>
        <form onSubmit={handleSubmitWeekly}>
          <input
            type="text"
            placeholder="Enter monthly goal here"
            onChange={updateWeekly}
          />{" "}
          <button type="submit">{editWeekly ? "Edit" : "Enter"}</button>
        </form>
      </WeeklyContainer>

      <>
        {weeklyGoal ? (
          <WeeklyGoalContainer>
            {weeklyGoal}
            <button
              onClick={() => {
                handleEdit(weeklyGoal);
              }}
            >
              edit
            </button>
            <button
              onClick={() => {
                // handleDelete(item.id);
              }}
            >
              delete
            </button>
            {/* stretch: add a second "are you sure" step for delete */}
            <button
              onClick={() => {
                // handleComplete(item.id);
              }}
            >
              complete
            </button>
          </WeeklyGoalContainer>
        ) : (
          <></>
        )}
      </>
    </GoalContainer>
  );
};

const WeeklyGoalContainer = styled.div`
display: flex;
`

const WeeklyHeader = styled.div``;

const WeeklyContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: ${({ theme }) => theme.border};
  border-radius: 10px;
  padding 8px 14px 24px 14px;
`;

const WeeklyDays = styled.h4`
  color: ${({ theme }) => theme.light};
`;

const GoalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  width: 30vw;
`;

export default WeeklyGoals;
