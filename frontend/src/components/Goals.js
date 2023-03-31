import { useContext, useEffect, useState } from "react";
import { CurrentContext } from "../CurrentContext";
import { setDay } from "date-fns";
import styled from "styled-components";

const Goals = () => {
  const [daysLeftMonth, setDaysLeftMonth] = useState(0);
  const [daysLeftWeek, setDaysLeftWeek] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState(null);
  const [monthlyGoal, setMonthlyGoal] = useState("");
  const [monthlyUpdate, setMonthlyUpdate] = useState("");
  let date = new Date();
  let month = date.getMonth();
  let day = date.getDate();
  let weekday = date.getDay();

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

  useEffect(() => {
    setDaysLeftWeek(6 - weekday);
  });



  const setMonthly = () => {
    if (monthlyGoal) {
      return (<>{monthlyGoal}
        <button>edit</button>
     </> )
    } else {
      return (
        <>
          <input type="text" onChange={monthly} />{" "}
          <button
            onClick={() => {
              setGoal();
            }}
          >
            Enter
          </button>
        </>
      );
    }
  };

  const setWeekly = () => {
    if (weeklyGoal) {
      return weeklyGoal;
    } else {
      return <input type="text" />;
    }
  };

  const monthly = (e) => {
    setMonthlyUpdate(e.target.value);
  };

  // if (monthlyUpdate !== "") {
  //   // setMonthlyGoal(monthlyUpdate);
  //   setMonthlyUpdate("");
  // }

  const setGoal = (e) => {
    setMonthlyGoal(monthlyUpdate)
  };

  return (
    <>
      <WeeklyContainer>
        <WeeklyHeader>
          <h2>your weekly goal: </h2>
          <h4> days left to complete: {daysLeftWeek}</h4>
        </WeeklyHeader>
        {setWeekly()}
      </WeeklyContainer>

      <MonthlyContainer>
        <MonthlyHeader>
          <h2>your {whichMonth[month].toLowerCase()} goal:</h2>
          <h4>days: left to complete: {daysLeftMonth}</h4>
        </MonthlyHeader>
        {setMonthly()}
      </MonthlyContainer>
    </>
  );
};

const WeeklyHeader = styled.div`
  display: inline-flex;
`;

const WeeklyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MonthlyHeader = styled.div`
  display: inline-flex;
`;

const MonthlyContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Goals;
