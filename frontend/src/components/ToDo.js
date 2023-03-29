import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Task from "./Task";

const ToDo = () => {

  const [formData, setFormData] = useState("");
  const [toDo, setToDo] = useState([]);
 
  let navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setFormData(e.target.value);
    console.log(formData);
  };

const addToList = (e) => {
  e.preventDefault();

  const task = {
  id: Math.floor(Math.random() * 888888),
  value: formData
}

setToDo(toDoList => [...toDoList, task]);
setFormData("");

}

  return (
    <>
    <ToDoTitle>To Do List:</ToDoTitle>
      <form onSubmit={addToList}>
        <ToDoInput
          type="text"
          onChange={handleChange}
          value={formData}
          placeholder="What needs to get done?"
        />
        <EnterButton type="submit">Add to list</EnterButton>
      </form>
      {/* <Task/> */}
    </>
  );
};

const ToDoTitle = styled.h2`
/* font-family: cedarville-cursive; */
/* font-size: 2em; */
`;

const ToDoInput = styled.textarea`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 30vw;
  height: 10vh;
`;

const EnterButton = styled.button`
  width: 200px;
`;

const ListItem = styled.button`
  /* display: none; */
  width: 300px;
  height: 50px;
`;

export default ToDo;
