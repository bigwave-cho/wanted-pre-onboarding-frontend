import React from 'react';
import styled from 'styled-components';

const InputBox = ({ setInputValue, inputValue }) => {
  const handleInput = event => {
    const { name, value } = event.target;

    setInputValue({ ...inputValue, [name]: value });
  };

  return (
    <InputContents>
      <input
        name="email"
        onChange={handleInput}
        value={inputValue.email}
        placeholder="이메일을 입력하세요."
        autoComplete="off"
      ></input>

      <input
        name="password"
        onChange={handleInput}
        type="password"
        value={inputValue.password}
        placeholder="비밀번호를 입력하세요."
        autoComplete="off"
      ></input>
    </InputContents>
  );
};

const InputContents = styled.div`
  ${({ theme }) => theme.variables.flex('column', '', 'center')}

  input {
    width: 350px;
    height: 40px;
    margin-bottom: 20px;
    border-radius: 5px;
    padding-left: 10px;
    border: 1px solid gray;

    font-size: 15px;
    font-weight: 800;

    ::placeholder {
      color: gray;
      font-weight: 700;
    }
  }
`;

export default InputBox;
