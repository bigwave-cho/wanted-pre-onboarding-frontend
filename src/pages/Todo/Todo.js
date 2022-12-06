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

  if (!access_token) navigate('/');

  useEffect(() => {
    if (!access_token) {
      navigate('/');
      alert('로그아웃 상태입니다. 다시 로그인 해주세요.');
    } else {
      fetchData('/todos', access_token, 'GET').then(data => {
        setTodoList([...data].map(list => ({ ...list, modify: false })));
      });
    }

    //eslint-disable-next-line
  }, [access_token]);

  const doLogout = () => {
    localStorage.removeItem('access_token');
    window.location.reload();
  };

  return (
    <TodoContainer>
      <TodoWrapper>
        <Title>
          <span>To Do List</span>
          <button
            onClick={() => {
              doLogout();
            }}
          >
            로그아웃
          </button>
        </Title>
        <AddTodo setTodoList={setTodoList}></AddTodo>
        <TodoLists setTodoList={setTodoList} todoList={todoList}></TodoLists>
      </TodoWrapper>
    </TodoContainer>
  );
};

const Title = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0px 10px 0px;
  width: 100%;
  border-bottom: 3px solid black;
  font-size: 60px;
  font-family: 'Jua', sans-serif;

  button {
    width: 90px;
    height: 40px;
    border: 1px solid lightgray;

    font-family: 'Jua', sans-serif;
    font-size: 17px;

    &:hover {
      color: blue;
    }
  }
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
