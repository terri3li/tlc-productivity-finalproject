import { useState, useContext } from "react";
import styled from "styled-components";
import { CurrentContext } from "../CurrentContext";

const ToDoList = () => {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const [editToDo, setEditToDo] = useState(0);
  const [userReward, setUserReward] = useState("");
  const [reward, setReward] = useState("");
  const { tasksCompleted, setTasksCompleted } = useContext(CurrentContext);
  let itemReward = "";
  const [toggleReward, setToggleReward] = useState(false)
 

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
      return;
    }

    if (toDo !== "") {
      setToDos([{ id: `${toDo}-${Date.now()}`, toDo, userReward }, ...toDos]);
      setToDo("");
    }

    if (userReward !== "") {
      setUserReward("");
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
    setTasksCompleted(tasksCompleted + 1);
    const deleteToDo = toDos.filter((toDo) => toDo.id !== id);
    setToDos([...deleteToDo]);
  };

  // const handleReward = (id) => {
  //   setToggleReward(true)
  // }

  const updateToDo = (e) => {
    setToDo(e.target.value);
  };

  const updateReward = (e) => {
    setUserReward(e.target.value);
  };

  return (
    <>
      <h2>To Do List</h2>
      <ToDoForm onSubmit={handleSubmit}>
        <ToDoInput
          type="text"
          placeholder="Enter to do item here (required)"
          value={toDo}
          onChange={updateToDo}
        />
        <RewardContainer>
          <RewardInput
            type="text"
            placeholder="Enter completion reward here (optional)"
            value={userReward}
            onChange={updateReward}
            // style={{
            //   visibility: toggleReward ? "visible" : "hidden",
            // }}
          />
          {/* <RewardButton onClick={() => addReward()}>Treat Myself</RewardButton> */}
        </RewardContainer>
        <button type="submit">{editToDo ? "Edit" : "Enter"}</button>
      </ToDoForm>

      {/* ---posted to do items below--- */}

      <ul>
        {toDos.map((item) => {
          return (
            <li key={item.id}>
              <ToDoItem>To Do: {item.toDo}</ToDoItem>
              <div>{item.userReward}</div>
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

          
              {/* <button onClick={() => {
                  handleReward(item.id);
                }}>reward</button> */}
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

const RewardInput = styled.input`
/* visibility: hidden; */
  width: 400px;
`;

const RewardContainer = styled.span`
  display: inline-flex;
`;

const RewardButton = styled.button``;

export default ToDoList;
