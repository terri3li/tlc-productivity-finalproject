import Calendar from "react-calendar";
import { useState } from "react";
import styled from "styled-components";


const MainCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <CalendarContainer>
      {/* <Calendar onChange={setDate} value={date} /> */}
    
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  min-width: 500px;
  margin: auto;
  margin-top: 20px;
  background-color: #ffcfe9;
  padding: 10px;
  border-radius: 15px;

  .react-calendar__navigation {
    display: flex;
  }

  .react-calendar__navigation__label {
    font-weight: bold;
  }

  .react-calendar__navigation__arrow {
    flex-grow: 0.333;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
  }

  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%; 

    .react-calendar__tile {
      max-width: initial !important;
    }
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.6;
  }

  .react-calendar__tile--range {
      box-shadow: 0 0 4px 1.5px gray;
  }

 

  button {
    margin: 3px;
    background-color: #cffbff;
    border: 0;
    border-radius: 5px;
    color: black;
    padding: 5px 0;

    &:hover {
      background-color: #fffbcf;
    }

    &:active {
      background-color: #cfffdc;
    }
  }
`;

export default MainCalendar;
