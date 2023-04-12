import Calendar from "react-calendar";
import { useState } from "react";
import styled from "styled-components";

const HomeCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <CalendarContainer>
      <Calendar onChange={setDate} value={date} />
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  min-width: 25vw;
  margin: auto;
  margin-top: 4vh;
  background-color: ${({ theme }) => theme.header};
  padding: 1vw;
  border: ${({ theme }) => theme.border};
  border-radius: 15px;


  .react-calendar__navigation {
    display: flex;

  }

  .react-calendar button {
    padding: 0.5vw;
    margin: 0.25vw;
    border-radius: 5px;
    border: none;
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
    padding-top: 1vw;

    .react-calendar__tile {
      max-width: initial !important;
      padding: 1vw;
    }
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.4;
  }

  .react-calendar__tile--range {
    box-shadow: 0 0 4px 1.5px gray;
    padding: 5px;
  }
`;

export default HomeCalendar;
