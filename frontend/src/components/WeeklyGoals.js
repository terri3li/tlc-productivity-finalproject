import { useContext, useEffect, useState } from "react";
import { CurrentContext } from "../CurrentContext";
import { setDay } from "date-fns";
import styled from "styled-components";
import { format } from "date-fns";
import WeeklyPopUp from "./popups/WeeklyPopUp";

const WeeklyGoals = () => {
  const [weeklyUpdate, setWeeklyUpdate] = useState("");
  const [daysLeftWeek, setDaysLeftWeek] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState(null);
  const [completeTrigger, setCompleteTrigger] = useState(false);
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const [submitTrigger, setSubmitTrigger] = useState(false);

  const { weeklysCompleted, setWeeklysCompleted, user } =
    useContext(CurrentContext);

  let date = new Date();
  let month = date.getMonth();
  let weekday = date.getDay();
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

    ////----- SUBMIT TO MONGO

    useEffect(() => {
      if (submitTrigger && weeklyGoal) {
        fetch(`/get-user/weekly-to-do/${user.email}`, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            weeklyToDo: weeklyGoal,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("weekly goal updated");
            setSubmitTrigger(false);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }, [submitTrigger]);

  ////----- COMPLETE && update tasks in Mongo

  useEffect(() => {
    if (completeTrigger) {
      const weeklysCompletedForPatch = weeklysCompleted + 1;
      fetch(`/get-user/weeklys-completed/${user.email}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          weeklysCompleted: weeklysCompletedForPatch,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setWeeklysCompleted(weeklysCompleted + 1);
          setCompleteTrigger(false);
          setDeleteTrigger(true);
          setWeeklyGoal("");
          setWeeklyUpdate("")
          console.log("weekly completed");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [completeTrigger]);

  ////----- DELETE/UPDATE ON MONGO

  useEffect(() => {
    if (deleteTrigger) {
      fetch(`/get-user/weekly-to-do/${user.email}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          weeklyToDo: "",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("weekly updated (deleted)");
          setDeleteTrigger(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [deleteTrigger]);

  ////-----HANDLESUBMIT

  const handleSubmitWeekly = (e) => {
    e.preventDefault();

    if (weeklyUpdate !== "") {
      setWeeklyGoal(weeklyUpdate);
      setWeeklyUpdate("");
      setSubmitTrigger(true);
    }
  };

  ////------ HANDLEDELETE

  const handleDelete = () => {
    setWeeklyGoal("");
    setDeleteTrigger(true);
  };

  ////------- HANDLECOMPLETE

  const handleComplete = () => {
    setCompleteTrigger(true);
  };

  ////---- UPDATE

  const updateWeekly = (e) => {
    setWeeklyUpdate(e.target.value);
  };

  return (
    <GoalContainer>
      <WeeklyContainer>
        <WeeklyHeader>
        <PopUpHeader>
        <WeeklyPopUp />
          <h2>
            goal for the week of sunday,{" "}
            {whichMonth[month].toLowerCase() + " " + sundayDate}:{" "}
          </h2>
          </PopUpHeader>
          <WeeklyDays> days left to complete: {daysLeftWeek}</WeeklyDays>
        </WeeklyHeader>
        <WeeklyForm onSubmit={handleSubmitWeekly}>
          <GoalInput
            type="text"
            placeholder="Enter weekly goal here"
            onChange={updateWeekly}
            value={weeklyUpdate}
          />{""}
          <GoalButton type="submit">Enter</GoalButton>
        </WeeklyForm>

      <>
        {weeklyGoal ? (
          <WeeklyGoalContainer>
            {weeklyGoal}

            <button
              onClick={() => {
                handleDelete();
              }}
              >
              delete
            </button>
            {/* stretch: add a second "are you sure" step for delete */}
            <button
              onClick={() => {
                handleComplete();
              }}
              >
              complete
            </button>
          </WeeklyGoalContainer>
        ) : (
          <></>
          )}
      </>
      
          </WeeklyContainer>
    </GoalContainer>
  );
};

const WeeklyGoalContainer = styled.div`
  display: flex;
`;

const WeeklyForm = styled.form`
  display: flex;
  gap: 1vw;
`;

const PopUpHeader = styled.div`
display: flex;
align-items: baseline;
gap: 1vw;
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

const GoalInput = styled.input`
  width: 15vw;
  border-radius: 5px;
  padding: 0.5vw;
  font-size: 0.9em;
`;

const GoalButton = styled.button`
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
`;

const GoalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
  width: 30vw;
`;

export default WeeklyGoals;
