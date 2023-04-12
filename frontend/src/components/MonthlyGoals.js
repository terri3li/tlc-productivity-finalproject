import { useContext, useEffect, useState } from "react";
import { CurrentContext } from "../CurrentContext";
import styled from "styled-components";
import { format } from "date-fns";
import MonthlyPopUp from "./popups/MonthlyPopUp";

const MonthlyGoals = () => {
  const [daysLeftMonth, setDaysLeftMonth] = useState(0);
  const [monthlyUpdate, setMonthlyUpdate] = useState("");
  const [submitTrigger, setSubmitTrigger] = useState(false);
  const [completeTrigger, setCompleteTrigger] = useState(false);
  const [deleteTrigger, setDeleteTrigger] = useState(false);


  const {monthlysCompleted, setMonthlysCompleted, user, monthlyGoal, setMonthlyGoal} = useContext(CurrentContext);

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

    ////----- SUBMIT TO MONGO

  useEffect(() => {
    if (submitTrigger && monthlyGoal) {
      fetch(`/get-user/monthly-to-do/${user.email}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          monthlyToDo: monthlyGoal,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("monthly goal updated");
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
      const monthlysCompletedForPatch = monthlysCompleted + 1;
      fetch(`/get-user/monthlys-completed/${user.email}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          monthlysCompleted: monthlysCompletedForPatch,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setMonthlysCompleted(monthlysCompleted + 1);
          setCompleteTrigger(false);
          setDeleteTrigger(true);
          setMonthlyGoal("");
          setMonthlyUpdate("")
          console.log("monthly completed");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [completeTrigger]);

    ////----- DELETE/UPDATE ON MONGO

    useEffect(() => {
      if (deleteTrigger) {
        fetch(`/get-user/monthly-to-do/${user.email}`, {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            monthlyToDo: "",
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("monthly updated (deleted)");
            setDeleteTrigger(false);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }, [deleteTrigger]);

      ////-----HANDLESUBMIT

  const handleSubmitMonthly = (e) => {
    e.preventDefault();

    if (monthlyUpdate !== "") {
      setMonthlyGoal(monthlyUpdate);
      setMonthlyUpdate("");
      setSubmitTrigger(true);
    }
  };

  ////------ HANDLEDELETE

  const handleDelete = () => {
    setMonthlyGoal("");
    setDeleteTrigger(true);
  };

  ////------- HANDLECOMPLETE

  const handleComplete = () => {
    setCompleteTrigger(true);
   
  };

  ////---- UPDATE

  const updateMonthly = (e) => {
    setMonthlyUpdate(e.target.value);
  };

  return (
    <GoalContainer>
      <MonthlyContainer>
        <MonthlyHeader>
          <PopUpHeader>
        <MonthlyPopUp />
          <h2>your {whichMonth[month].toLowerCase() + " " + year} goal:</h2>
          </PopUpHeader>
          <MonthlyDays>days left to complete: {daysLeftMonth}</MonthlyDays>
        </MonthlyHeader>
        <MonthlyForm onSubmit={handleSubmitMonthly}>
          <GoalInput
            type="text"
            placeholder="Enter monthly goal here"
            onChange={updateMonthly}
            value={monthlyUpdate}
          />
          {""}
          <GoalButton type="submit">Enter</GoalButton>
        </MonthlyForm>

        <>
          {monthlyGoal ? (
            <MonthlyGoalContainer>
              {monthlyGoal}

              <button
                onClick={() => {
                  handleDelete();
                }}
              >
                delete
              </button>
              
              <button
                onClick={() => {
                  handleComplete();
                }}
              >
                complete
              </button>
            </MonthlyGoalContainer>
          ) : (
            <></>
          )}
        </>
      </MonthlyContainer>
    </GoalContainer>
  );
};

const MonthlyGoalContainer = styled.div`
  display: flex;
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

const MonthlyForm = styled.form`
display: flex;
gap: 1vw;
`;

const PopUpHeader = styled.div`
display: flex;
align-items: baseline;
gap: 1vw;
`

const MonthlyHeader = styled.div`
`;

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

export default MonthlyGoals;
