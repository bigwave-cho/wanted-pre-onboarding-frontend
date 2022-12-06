import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    width: 100px;
    height: 30px;
    margin-right: 20px;

    &:hover {
      color: blue;
    }
  }
  #signin {
    width: 200px;
    height: 30px;
    margin-left: 30px;
    color: blue;
    &:disabled {
      color: lightgray;
    }
  }

  button:disabled {
  }
`;

export default BtnBox;
