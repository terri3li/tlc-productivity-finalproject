import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { CurrentContext } from "../CurrentContext";
import Loading from "./Loading";
import ToDoPopUp from "./popups/ToDoPopUp";

const ToDoList = () => {
  const [toDo, setToDo] = useState("");
  const [editToDo, setEditToDo] = useState(0);
  const [submitTrigger, setSubmitTrigger] = useState(false);
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const [completeTrigger, setCompleteTrigger] = useState(false);
  

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

  ////----- SUBMIT TO MONGO

  useEffect(() => {
    if (submitTrigger) {
      fetch(`/get-user/toDos/${user.email}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toDos: toDos,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("to dos updated (added)");
          setSubmitTrigger(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [submitTrigger]);

  ////----- DELETE/UPDATE ON MONGO

  useEffect(() => {
    if (deleteTrigger) {
      fetch(`/get-user/toDos/${user.email}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          toDos: toDos,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("to dos updated (deleted)");
          setDeleteTrigger(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [deleteTrigger]);

  ////----- COMPLETE && update tasks in Mongo

  useEffect(() => {
    if (completeTrigger) {
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
          setCompleteTrigger(false);
          setDeleteTrigger(true);
          console.log("to do updated (completed)");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [completeTrigger]);

  ////------- HANDLESUBMIT

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
      setSubmitTrigger(true);

      return;
    }

    if (toDo !== "") {
      setToDos([{ id: Math.floor(Math.random() * 8888888), toDo }, ...toDos]);
      setToDo("");
      setSubmitTrigger(true);
    }
  };

  ////------- HANDLEEDIT

  const handleEdit = (id) => {
    const edit = toDos.find((item) => item.id === id);
    setToDo(edit.toDo);
    setEditToDo(id);
  };

  ////------ HANDLEDELETE

  const handleDelete = (id) => {
    const deleteToDo = toDos.filter((toDo) => toDo.id !== id);
    setToDos([...deleteToDo]);
    setDeleteTrigger(true);
  };

  ////------- HANDLECOMPLETE

  const handleComplete = (id) => {
    setCompleteTrigger(true)
    const deleteToDo = toDos.filter((toDo) => toDo.id !== id);
    setToDos([...deleteToDo]);
  };

  ////------ UPDATE
console.log(toDos);

  const updateToDo = (e) => {
    setToDo(e.target.value);
  };

  return (
    <ToDoContainer>
      <ToDoPopUp/>
      <Title>To Do List</Title>
      <ToDoForm onSubmit={handleSubmit}>
        <ToDoInput
          type="text"
          placeholder="Enter to do item here"
          value={toDo}
          onChange={updateToDo}
        />

        <EnterEditButton type="submit">{editToDo ? "Edit" : "Enter"}</EnterEditButton>
      </ToDoForm>





      <List>
        {toDos.map((item) => {
          return (
            <ItemButtonContainer>
            <ItemContainer key={item.id}>
              <ToDoItem key={item.id}>{item.toDo}</ToDoItem>
              </ItemContainer>
              <ButtonContainer>

              <ItemButton
                onClick={() => {
                  handleEdit(item.id);
                }}
              >
                edit
              </ItemButton>
              <ItemButton
                onClick={() => {
                  handleDelete(item.id);
                }}
              >
                delete
              </ItemButton>
              
              <ItemButton
                onClick={() => {
                  handleComplete(item.id);
                }}
              >
                complete
              </ItemButton>
                </ButtonContainer>
</ItemButtonContainer>
            
          );
        })}
      </List>
    </ToDoContainer>
  );
};

const ToDoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid 1px;
  border-radius: 10px;
  padding: 1vw;
`;

const Title = styled.h2`
  text-decoration: underline;
`;

const List = styled.ul`
list-style-type: none;
margin-right: 3vw;
`;

const ToDoItem = styled.span``;

const ToDoForm = styled.form`
  display: flex;
  gap: 1vw;
`;

const ToDoInput = styled.input`
  width: 20vw;
  padding: 0.5vw;
  margin-bottom: 1vw;
  border-radius: 5px;
  font-size:0.9em;
`;

const EnterEditButton = styled.button`
width: 5vw;
height: 4.3vh;
border-radius: 5px;
`;

const ItemContainer = styled.li`
display: flex;

padding: 1vh;
margin-bottom: 1.5vh; 
border-radius: 5px;
`;

const ItemButton = styled.button`
padding: 0.75vh;
`;

const ButtonContainer = styled.div`
`;

const ItemButtonContainer = styled.div`
display: flex;
align-items: baseline;
gap: 2vh;
`;

export default ToDoList;
