import React from 'react';
import styled from 'styled-components';
import fetchData from '../../../api/fetchData';

const TodoLists = ({ todoList, setTodoList }) => {
  const access_token = localStorage.getItem('access_token');

  const handleCheck = e => {
    setTodoList(todos =>
      todos.map(todo =>
        todo.id === e.target.id * 1
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      )
    );
  };

  const modifyInput = e => {
    setTodoList(todos =>
      todos.map(todo =>
        todo.id === e.target.dataset.index * 1
          ? { ...todo, todo: e.target.value }
          : todo
      )
    );
  };

  const handleToggle = e => {
    setTodoList(todos =>
      todos.map(todo =>
        todo.id === e.target.dataset.index * 1
          ? { ...todo, modify: !todo.modify }
          : todo
      )
    );

    if (e.target.id === 'cancelBtn') {
      console.log('hi');
      fetchData('/todos', access_token, 'GET').then(data => {
        setTodoList([...data].map(list => ({ ...list, modify: false })));
      });
    }
  };

  const handleUpdate = async e => {
    let id = e.target.dataset.index;
    let index = todoList.findIndex(
      v => v.id * 1 === e.target.dataset.index * 1
    );
    console.log(id, index);
    fetchData(`/todos/${id}`, access_token, 'PUT', {
      todo: todoList[index].todo,
      isCompleted: todoList[index].isCompleted,
    });

    handleToggle(e);
  };

  const deleteList = async e => {
    let id = e.target.dataset.index;
    let copy = [...todoList].filter(list => Number(list.id) !== id * 1);
    setTodoList(copy);
    fetchData(`/todos/${id}`, access_token, 'DELETE');
  };

  return (
    <TodoListWrapper>
      {todoList.map(list => {
        return (
          <TodoList iscompleted={String(list.isCompleted)} key={list.id}>
            {!list.modify ? (
              <TodoContent iscompleted={String(list.isCompleted)}>
                <div
                  iscompleted={String(list.isCompleted)}
                  className="todoContent"
                >
                  {list.todo}
                </div>
                <div className="modifyControl">
                  <button data-index={list.id} onClick={handleToggle}>
                    수정
                  </button>
                  <button data-index={list.id} onClick={deleteList}>
                    삭제
                  </button>
                </div>
              </TodoContent>
            ) : (
              <ModifyContent iscompleted={String(list.isCompleted)}>
                <div className="modifyControl">
                  <input
                    className="modifyInput"
                    onChange={modifyInput}
                    data-index={list.id}
                    value={list.todo}
                  ></input>
                  <input
                    id={list.id}
                    className="checkBox"
                    type="checkbox"
                    onChange={handleCheck}
                    checked={list.isCompleted}
                  ></input>
                  <div className="buttonWrapper">
                    <button data-index={list.id} onClick={handleUpdate}>
                      제출
                    </button>
                    <button
                      id="cancelBtn"
                      data-index={list.id}
                      onClick={handleToggle}
                    >
                      취소
                    </button>
                  </div>
                </div>
              </ModifyContent>
            )}
          </TodoList>
        );
      })}
    </TodoListWrapper>
  );
};

const ModifyContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 890px;
  height: 40px;
  margin-right: 5px;

  .modifyControl {
    display: flex;
    align-items: center;

    .modifyInput {
      width: 700px;
      height: 30px;
      padding-left: 10px;
      border: 0px;
      background-color: rgba(255, 255, 255, 0.8);

      font-family: 'Jua', sans-serif;
      font-size: 15px;
      text-decoration: ${props =>
        props.iscompleted === 'true' && 'line-through'};
      color: ${props => props.iscompleted === 'true' && 'gray'};
    }

    .checkBox {
      position: relative;
      left: 10px;
      width: 30px;
      height: 30px;
    }

    .buttonWrapper {
      margin-left: 12px;

      button {
        width: 60px;
        height: 30px;
        margin-left: 10px;
        opacity: 0.9;
        border: 0px;
        border-radius: 5px;
        background-color: white;

        font-family: 'Jua', sans-serif;
        font-size: 15px;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
`;

const TodoContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 890px;
  height: 40px;
  margin-right: 5px;

  font-family: 'Jua', sans-serif;
  font-size: 18px;

  .todoContent {
    width: 700px;
    padding-left: 10px;
    text-decoration: ${props => props.iscompleted === 'true' && 'line-through'};
    color: ${props => props.iscompleted === 'true' && 'gray'};
  }

  .modifyControl {
    display: flex;

    button {
      width: 60px;
      height: 30px;
      margin-left: 10px;
      border: 0px;
      border-radius: 5px;

      background-color: bisque;
      font-family: 'Jua', sans-serif;
      font-size: 15px;

      &:hover {
        opacity: 0.7;
      }
    }
  }
`;

const TodoList = styled.li`
  margin-bottom: 10px;
  width: 900px;

  border: 1px solid lightgray;
  background-color: ${props =>
    props.iscompleted === 'true' ? 'lightblue' : null};
`;

const TodoListWrapper = styled.ul`
  width: 100%;
  background-color: white;
`;

export default TodoLists;
