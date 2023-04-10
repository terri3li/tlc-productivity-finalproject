import { useContext, useEffect, useState } from "react";
import { CurrentContext } from "../CurrentContext";
import { setDay } from "date-fns";
import styled from "styled-components";
import { format } from "date-fns";
import PopUpTest from "./PopUpTest";

const Goals = () => {
  const [daysLeftMonth, setDaysLeftMonth] = useState(0);
  // const [daysLeftWeek, setDaysLeftWeek] = useState(0);
  // const [weeklyGoal, setWeeklyGoal] = useState(null);
  const [monthlyGoal, setMonthlyGoal] = useState("");
  const [monthlyUpdate, setMonthlyUpdate] = useState("");
  const [editMonthly, setEditMonthly] = useState(0);
  // const [currentWeek, setCurrentWeek] = useState("");

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
  //------ monthly goal calculations;
  //---------- set month name & calculate days left

  useEffect(() => {
    if (month === 3 || month === 5 || month === 8 || month === 10) {
      setDaysLeftMonth(30 - day);
    } else if (month === 1) {
      setDaysLeftMonth(28 - day);
    } else {
      setDaysLeftMonth(31 - day);
    }
  }, [month]);

  // useEffect(() => {
  //   setDaysLeftWeek(6 - weekday);
  // }, []);

  const handleEdit = (e) => {
    setMonthlyUpdate("test");
    setEditMonthly(monthlyGoal);
  };

  // const setWeekly = () => {
  //   if (weeklyGoal) {
  //     return weeklyGoal;
  //   } else {
  //     return <input type="text" />;
  //   }
  // };

  const updateMonthly = (e) => {
    setMonthlyUpdate(e.target.value);
  };

  const handleSubmitMonthly = (e) => {
    e.preventDefault();

    if (editMonthly) {
      // const updatedMonthlyGoal =
      // // setToDos(updatedToDos);
      // // setEditToDo(0);
      // // setToDo("");
      // return;
    }

    setMonthlyGoal(monthlyUpdate);
    setMonthlyUpdate("");
  };

  // if (monthlyUpdate !== "") {
  //   // setMonthlyGoal(monthlyUpdate);
  //   setMonthlyUpdate("");
  // }

  return (
    <GoalContainer>
   

      <MonthlyContainer>
        <PopUpTest/>
        <MonthlyHeader>
          <h2>your {whichMonth[month].toLowerCase() + " " + year} goal:</h2>
          <MonthlyDays>days: left to complete: {daysLeftMonth}</MonthlyDays>
        </MonthlyHeader>
        <form onSubmit={handleSubmitMonthly}>
          <input
            type="text"
            placeholder="Enter monthly goal here"
            onChange={updateMonthly}
          />{" "}
          <button type="submit">{editMonthly ? "Edit" : "Enter"}</button>
        </form>

        <>
          {monthlyGoal ? (     
          <MonthlyGoalContainer>{monthlyGoal}<button
            onClick={() => {
              handleEdit(monthlyGoal);
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
          </button></MonthlyGoalContainer>) : (<></>)}


     
        </>
      </MonthlyContainer>
    </GoalContainer>
  );
};

const MonthlyGoalContainer = styled.div`
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

const MonthlyHeader = styled.div``;

const MonthlyContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: ${({ theme }) => theme.border};
  border-radius: 10px;
  padding 8px 14px 24px 14px;
`;

const MonthlyDays = styled.h4`
  color: ${({ theme }) => theme.light};
`;

const GoalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  width: 30vw;
`;

export default Goals;
