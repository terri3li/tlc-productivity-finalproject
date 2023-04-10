import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { CurrentContext } from "../CurrentContext";
import Loading from "./Loading"

const ToDoList = () => {
  const [toDo, setToDo] = useState("");
  const [editToDo, setEditToDo] = useState(0);
  const [mongoTrigger, setMongoTrigger] = useState(false);

  const {
    user,
    tasksCompleted,
    setTasksCompleted,
    recentTasks,
    setRecentTasks,
    completed,
    setCompleted,
    mongoUser,
    toDos,
    setToDos,
  } = useContext(CurrentContext);

  useEffect(() => {

    if (mongoTrigger) {
    fetch(`/get-user/toDos/${user.email}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        toDo: toDos,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("to dos updated");
        setMongoTrigger(false);
      })
      .catch((e) => {
        console.log(e);
      });
    }
  }, [mongoTrigger]);

  ////------- SUBMIT

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editToDo) {
      const editItem = toDos.find((item) => item.id === editToDo);

      const updatedToDos = toDos.map((td) => {
        return td.id === editItem.id
          ? (td = { id: td.id, toDo })
          : { id: td.id, toDo: td.toDo };
      });

      setToDos(updatedToDos);
      setEditToDo(0);
      setToDo("");
      setMongoTrigger(true);

      return;
    }

    //logging one behind
    if (toDo !== "") {
      setToDos([{id: Math.floor(Math.random() * 8888888), toDo}, ...toDos]);
      setToDo("");
      setMongoTrigger(true);
    }
  };

  ////------- EDIT

  const handleEdit = (id) => {
    const edit = toDos.find((item) => item.id === id);
    setToDo(edit.toDo);
    setEditToDo(id);
  };

  ////------ DELETE

  const handleDelete = (id) => {
    const deleteToDo = toDos.filter((toDo) => toDo.id !== id);
    setToDos([...deleteToDo]);
  };
  
////------- COMPLETE

  const handleComplete = (id) => {
  
    const tasksCompletedForPatch = tasksCompleted + 1;
  
    
    fetch(`/get-user/tasks-completed/${user.email}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tasksCompleted: tasksCompletedForPatch,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
        setTasksCompleted(tasksCompleted + 1);
        setCompleted(true);
        console.log("task updated");
      })
      .catch((e) => {
        console.log(e);
      });

    const deleteToDo = toDos.filter((toDo) => toDo.id !== id);
    setToDos([...deleteToDo]);
  };

  ////------ UPDATE

  const updateToDo = (e) => {
    setToDo(e.target.value);
  };

 
   

  return (
    <ToDoContainer>
    
      <Title>To Do List</Title>
      <ToDoForm onSubmit={handleSubmit}>
        <ToDoInput
          type="text"
          placeholder="Enter to do item here"
          value={toDo}
          onChange={updateToDo}
        />

        <button type="submit">{editToDo ? "Edit" : "Enter"}</button>
      </ToDoForm>

      {/* ---posted to do items below--- */}

      <ul>
        {toDos.map((item) => {
         return (
            <li key={item.id}>
            
              <ToDoItem key={item.id}>To Do: {item.toDo}</ToDoItem>
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
            </li>
          );
        })}
      </ul>
    </ToDoContainer>
  );
};

const ToDoContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const Title = styled.h2`
text-decoration: underline;
`;

const ToDoItem = styled.span``;

const ToDoForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ToDoInput = styled.input`
  width: 400px;
`;

export default ToDoList;
