import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { CurrentContext } from "../CurrentContext";

const ToDoList = () => {
  const [toDo, setToDo] = useState("");
  // const [toDos, setToDos] = useState([]);
  const [editToDo, setEditToDo] = useState(0);
  const [mongoTrigger, setMongoTrigger] = useState(false);

  const {
    user,
    isLoading,
    tasksCompleted,
    setTasksCompleted,
    recentTasks,
    setRecentTasks,
    completed,
    setCompleted,
    mongoUser,
    rewards,
    toDos,
    setToDos
  } = useContext(CurrentContext);

  //// PAtch update to dos

  // useEffect(() => {
  //   fetch(`/get-user/toDos/${user.email}`, {
  //     method: "PATCH",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       toDo: [toDos],
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("to dos updated");
  //       setMongoTrigger(false);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, [mongoTrigger]);

  //prevent refresh, submit new to do item
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
      setToDos([toDo, ...toDos]);
      setToDo("");
      setMongoTrigger(true);
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
    //update user task completion count
    setTasksCompleted(tasksCompleted + 1);
    setCompleted(true);

    //recentTasks is running one update behind
    // console.log(recentTasks);
    const allDone = toDos.filter((toDo) => toDo.id === id);
    const completedTaskForProfile = allDone[0].toDo;
    setRecentTasks([
      { id: Math.floor(Math.random() * 888888), completedTaskForProfile },
      ...recentTasks,
    ]);

    //delete after completed
    const deleteToDo = toDos.filter((toDo) => toDo.id !== id);
    setToDos([...deleteToDo]);
  };

  const updateToDo = (e) => {
    setToDo(e.target.value);
  };

  return (
    <>
      <h2>To Do List</h2>
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
              <ToDoItem>To Do: {item}</ToDoItem>
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
    </>
  );
};

// const ToDoListItem = styled.ul`
// list-style-type: none;
// `;

const ToDoItem = styled.span``;

const ToDoForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const ToDoInput = styled.input`
  width: 400px;
`;

export default ToDoList;
