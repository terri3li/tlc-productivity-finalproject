import styled from "styled-components";

/////----******* Ignore, not being used *********

const Task = ({ setFormData, formData, toDo, setToDo }) => {

  return (
    <>
      {toDo.map((task) => {
        const complete = (e) => {
            e.preventDefault();
            
            }
        return <ListItem key={task.id} onClick={complete}> {task.value} </ListItem>;
      })}
    </>
  );
};

const ListItem = styled.button`
display: block;
border: none; 
background: none; 
padding: 5px;
`;

export default Task;
