import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserByToken } from '../asyncActions/user';
import auth from '../async/auth';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function MainLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const burgerIsActive = useSelector(
    (state) => state.burgerReduser.burgerIsActive
  );

  auth.checkAuth().then((data) => {
    if (!data.isAuth) {
      navigate('/');
    }
  });
  dispatch(fetchUserByToken());

  return (
    <div className='main '>
      <div
        className={
          burgerIsActive ? 'sidebar-screen active-sidebar' : 'sidebar-screen'
        }
      ></div>
      <Header />
      <Sidebar />
      <div className='container'>
        <Outlet />
      </div>
    </div>
  );
}
