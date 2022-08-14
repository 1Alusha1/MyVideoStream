import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchUserByToken } from '../asyncActions/user';

import auth from '../async/auth';
import Header from '../components/HeaderChanal/Header';
import Sidebar from '../components/Sidebar';
export default function UserChanalLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const burgerIsActive = useSelector(
    (state) => state.burgerReduser.burgerIsActive
  );

  useEffect(() => {
    auth.checkAuth(navigate);
    dispatch(fetchUserByToken());
  }, []);

  return (
    <div className='userChanal'>
      <div
        className={
          burgerIsActive ? 'sidebar-screen active-sidebar' : 'sidebar-screen'
        }
      ></div>
      <Sidebar />
      <Header />
      <div className='container'>
        <Outlet />
      </div>
    </div>
  );
}
