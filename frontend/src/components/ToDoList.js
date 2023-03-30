import { useState } from "react";
import styled from "styled-components";

const ToDoList = () => {
  //may break this down into smaller components

  //set individual to do items & to do list (array) in state
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);

  //prevent refresh, submit new to do item
  const handleSubmit = (e) => {
    e.preventDefault();

    if (toDo !== "") {
      setToDos([{ id: `${toDo}-${Date.now()}`, toDo }, ...toDos]);
      setToDo("");
    }
  };

  const updateToDo = (e) => {
    setToDo(e.target.value);
  };

  const handleEdit = (id) => {};

  const handleDelete = (id) => {
    console.log(id);
    const deleteToDo = toDos.filter((toDo) => toDo.id !== id);
    setToDos([...deleteToDo]);
  };

  const handleComplete = (id) => {};

  return (
    <>
      <h2>To Do List</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={toDo} onChange={updateToDo} />
        <button type="submit">Enter</button>
      </form>

      {/* ---posted to do items below--- */}

      <ul>
        {toDos.map((item) => {
          console.log(item.toDo);
          return (
            <li key={item.id}>
              <ToDoItem>{item.toDo}</ToDoItem>
              <button
                onClick={() => {
                  handleEdit(item.id);
                }}
              >
                edit
              </button>
              <button
                onClick={() => {
                  handleDelete(item.id);
                }}
              >
                delete
              </button>
              {/* add a second "are you sure" step for delete */}
              <button
                onClick={() => {
                  handleComplete(item.id);
                }}
              >
                complete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

const ToDoItem = styled.span``;

export default ToDoList;
