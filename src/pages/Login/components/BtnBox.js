import React from 'react';
import styled from 'styled-components';

const BtnBox = ({ handleSubmit, isLoginValid }) => {
  return (
    <ButtonWrapper>
      <button id="signup" onClick={handleSubmit} disabled={!isLoginValid}>
        회원가입
      </button>
      <button id="signin" onClick={handleSubmit} disabled={!isLoginValid}>
        로그인
      </button>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  margin-top: 20px;

  button {
    font-family: 'Jua', sans-serif;
    font-size: 20px;
  }

  #signup {
    width: 120px;
    height: 30px;
    margin-right: 10px;

    &:hover {
      color: blue;
    }

    &:disabled {
      color: lightgray;
    }
  }
  #signin {
    width: 190px;
    height: 30px;
    margin-left: 30px;
    color: blue;

    &:hover {
      color: blue;
    }

    &:disabled {
      color: lightgray;
    }
  }
`;

export default BtnBox;
