const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy';

const fetchData = (url, access_token, method, data) => {
  // const URL = `${PROXY}${url}`;
  const URL = `https://pre-onboarding-selection-task.shop${url}`;
  //로그인&회원가입
  const postLoginResult = async () => {
    const response = await fetch(URL, {
      method: method,
      headers: {
        credentials: 'include',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const json = await response.json();
    return json;
  };

  // todos 데이터 가져오기 / 삭제하기
  const getTodoList = async () => {
    const response = await fetch(URL, {
      method: method,
      headers: {
        credentials: 'include',
        Authorization: `Bearer ${access_token}`,
      },
    });

    const data = await response.json();

    return data;
  };

  //todos 추가 / 업데이트
  const addTodos = async () => {
    const response = await fetch(URL, {
      method: method,
      headers: {
        credentials: 'include',
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response;
  };

  if (!access_token) {
    return postLoginResult();
  }
  if ((url === '/todos' && method === 'GET') || method === 'DELETE') {
    return getTodoList();
  }
  if ((url === '/todos' && method === 'POST') || method === 'PUT')
    return addTodos();
};

export default fetchData;
