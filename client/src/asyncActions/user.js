import { getUserByTokenAction, getUserSubscriptions } from '../store/userReducer';
import user from '../async/user';
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
    data.then((data) => {
      dispatch(getUserByTokenAction(data));

      console.log(data.id)
      user.getUserSubscriptions(data.id).then((subscription) => {
        dispatch(getUserSubscriptions(subscription))
      });
    });
  };
};
