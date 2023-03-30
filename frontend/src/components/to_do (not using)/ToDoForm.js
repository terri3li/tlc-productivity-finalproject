import { useState } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ToDoForm = (props) => {
    const [formData, setFormData] = useState("");
  const [toDos, setToDos] = useState([]);
 
  let navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        setFormData(e.target.value);
      };
    
    const handleSubmit = (e) => {
      e.preventDefault();
    props.onSubmit({
        id: Math.floor(Math.random() * 888888),
        value: formData
    });

    setFormData("");
    };

  return (
    <>
   
    <form onSubmit={handleSubmit}>
        <ToDoInput
          type="text"
          placeholder="What needs to get done?"
          value={formData}
          name="text"
          onChange={handleChange}
        />
        <EnterButton type="submit">Add to list</EnterButton>
      </form>
 
    </>
  )
}

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

export default ToDoForm;