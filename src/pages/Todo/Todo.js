import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AddTodo from './components/AddTodo';
import TodoLists from './components/TodoLists';
import fetchData from '../../api/fetchData';

const Todo = () => {
  const navigate = useNavigate();

  const [todoList, setTodoList] = useState([]);

  const access_token = localStorage.getItem('access_token');

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      alert('로그인 토큰이 만료되었습니다.');
      navigate('/');
    }

    fetchData('/todos', access_token, 'GET').then(data => {
      setTodoList([...data].map(list => ({ ...list, modify: false })));
    });

    //eslint-disable-next-line
  }, []);

  return (
    <TodoContainer>
      <TodoWrapper>
        <Title>
          <span>Todo List</span>
        </Title>
        <AddTodo getTodoList={``} setTodoList={setTodoList}></AddTodo>
        <TodoLists setTodoList={setTodoList} todoList={todoList}></TodoLists>
      </TodoWrapper>
    </TodoContainer>
  );
};

const Title = styled.div`
  padding: 0px 0px 10px 0px;
  width: 100%;
  border-bottom: 3px solid black;
  font-size: 60px;
  font-family: 'Jua', sans-serif;
`;

const TodoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 900px;
  margin-top: 100px;

  background-color: white;
`;

const TodoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  width: 100%;
`;

export default Todo;
