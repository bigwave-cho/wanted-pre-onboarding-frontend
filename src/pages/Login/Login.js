import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import InputBox from './components/InputBox';
import BtnBox from './components/BtnBox';
import fetchData from '../../api/fetchData';

const Login = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  useEffect(() => {
    localStorage.getItem('access_token') && navigate('/todo');
    //eslint-disable-next-line
  }, []);

  const isLoginValid =
    inputValue.email.includes('@') && inputValue.password.length >= 8;

  const handleSubmit = e => {
    e.preventDefault();

    if (e.target.id === 'signup') {
      fetchData('/auth/signup', token, 'POST', inputValue).then(res => {
        if (res.statusCode === 400) {
          alert(res.message);
          setInputValue(prev => ({ ...prev, email: '', password: '' }));
        } else if (res.access_token) {
          alert('회원가입 성공!!');
        }
      });
    }

    if (e.target.id === 'signin') {
      fetchData('/auth/signin', token, 'POST', inputValue).then(res => {
        if (res.statusCode === 401) {
          alert('이메일 & 비밀번호를 확인해주세요.');
          setInputValue(prev => ({ ...prev, password: '' }));
        }
        if (res.access_token) {
          alert('로그인 성공!');
          localStorage.setItem('access_token', res.access_token);
          navigate('/todo');
        }
      });
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <LoginTitle>
          <div className="title">로그인 & 회원가입</div>
        </LoginTitle>
        <InputBox
          setInputValue={setInputValue}
          inputValue={inputValue}
        ></InputBox>
        <BtnBox
          handleSubmit={handleSubmit}
          isLoginValid={isLoginValid}
        ></BtnBox>
      </LoginForm>
    </LoginContainer>
  );
};

const LoginTitle = styled.div`
  padding: 30px;
  margin: 30px 0px 0px 0px;
  font-size: 30px;
  font-weight: 700;

  .title {
    font-family: 'Jua', sans-serif;
    font-size: 45px;
  }
`;

const LoginForm = styled.form`
  ${({ theme }) => theme.variables.flex('column', '', 'center')}
  width: 500px;
  height: 400px;
  border-radius: 15px;
  background-color: white;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: lightgray;
`;

export default Login;
