import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import auth from '../async/auth';

export default function MainLayout() {
  const navigate = useNavigate();
  
  auth.checkAuth().then((data) => {
    if (!data.isAuth) {
      navigate('/');
    }
  });


  return (
    <div className='main'>
      <div className='container'>
        <Outlet />
      </div>
    </div>
  );
}
