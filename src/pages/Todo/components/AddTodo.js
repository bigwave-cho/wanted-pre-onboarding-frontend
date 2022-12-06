import React, { useState } from 'react';
import styled from 'styled-components';
import fetchData from '../../../api/fetchData';

const AddTodo = ({ setTodoList }) => {
  const [addTodo, setAddTodo] = useState({
    todo: '',
  });

  const access_token = localStorage.getItem('access_token');

  const getTodoList = async URL => {
    return fetchData(URL, access_token, 'GET');
  };

  const postInputData = async URL => {
    return fetchData(URL, access_token, 'POST', addTodo);
  };

  const handleAddTodo = e => {
    setAddTodo(prev => ({ ...prev, todo: e.target.value }));
  };

  const submitTodo = e => {
    e.preventDefault();
    postInputData('/todos').then(res => {
      if (res.status === 201) {
        getTodoList('/todos').then(data => setTodoList([...data]));
        setAddTodo({ todo: '' });
      } else if (res.status === 400) {
        alert('내용을 입력해주세요.');
      }
    });
  };

  return (
    <AddTodoBox onSubmit={submitTodo}>
      <input
        onChange={handleAddTodo}
        value={addTodo.todo}
        placeholder="새로운 할 일을 입력하세요!!"
      ></input>
      <button onClick={submitTodo}>+</button>
    </AddTodoBox>
  );
};

const AddTodoBox = styled.form`
  width: 100%;
  height: 140px;
  display: flex;
  align-items: center;
  margin-top: 10px;

  input {
    width: 790px;
    height: 80px;
    padding-left: 20px;

    font-size: 20px;
    border-radius: 5px;
    border: 1px solid lightblue;
  }

  button {
    width: 80px;
    height: 80px;
    margin-left: 10px;

    border-radius: 5px;
    border: 0px;
    background-color: lightblue;

    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }
`;

export default AddTodo;
