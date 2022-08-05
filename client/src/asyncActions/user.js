import { getUserByTokenAction } from '../store/userReducer';

export const fetchUserByToken = () => {
  return async (dispatch) => {
    const res = await fetch('http://localhost:3001/api/user/getUserByToken', {
      method: 'POST',
      body: JSON.stringify({ token: document.cookie.split('=')[1] }),
      headers: {
        'content-type': 'application/json',
      },
    });
    const data = res.json();
    data.then((data) => dispatch(getUserByTokenAction(data)));
  };
};
