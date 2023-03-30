import { useState, useContext } from "react";
import styled from "styled-components";
import { CurrentContext } from "../CurrentContext";


const ToDoList = () => {

  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const [editToDo, setEditToDo] = useState(0);
  const {tasksCompleted, setTasksCompleted} = useContext(CurrentContext);

  console.log(tasksCompleted);

  //prevent refresh, submit new to do item
  const handleSubmit = (e) => {
    e.preventDefault();

    if(editToDo) {
      const editItem = toDos.find((item) => item.id === editToDo);

      const updatedToDos = toDos.map((td) => {
        return td.id === editItem.id ?
    ( td = {id: td.id, toDo}) : ({id: td.id, toDo: td.toDo})
    });
    
      setToDos(updatedToDos);
      setEditToDo(0);
      setToDo("");
      return;
      }

    if (toDo !== "") {
      setToDos([{ id: `${toDo}-${Date.now()}`, toDo }, ...toDos]);
      setToDo("");
    }
  };
    
  
  const handleEdit = (id) => {
    const edit = toDos.find((item) => item.id === id);
    setToDo(edit.toDo);
    setEditToDo(id);
  };
  
  const handleDelete = (id) => {
    const deleteToDo = toDos.filter((toDo) => toDo.id !== id);
    setToDos([...deleteToDo]);
  };
  
  const handleComplete = (id) => {
    setTasksCompleted(tasksCompleted + 1)
    console.log(tasksCompleted);
    const deleteToDo = toDos.filter((toDo) => toDo.id !== id);
    setToDos([...deleteToDo]);

  };
  
  const updateToDo = (e) => {
    setToDo(e.target.value);
  };

  return (
    <>
      <h2>To Do List</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={toDo} onChange={updateToDo} />
        <button type="submit">{editToDo ? "Edit" : "Enter"}</button>
      </form>

      {/* ---posted to do items below--- */}

      <ul>
        {toDos.map((item) => {
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
              {/* stretch: add a second "are you sure" step for delete */}
              <button
                onClick={() => {
                  handleComplete(item.id);
                }}
              >
                complete
              </button>
              {/* stretch: add a "congrats!" msg for complete */}
            </li>
          );
        })}
      </ul>
    </>
  );
};

const ToDoItem = styled.span``;

export default ToDoList;
