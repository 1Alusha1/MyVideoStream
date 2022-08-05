import Burger from './ui/Burger';
import UserIcon from './ui/UserIcon';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
export default function Header() {
  const userId = useSelector((state) => state.userReducer.user.id);

  return (
    <header className='header'>
      <div className='header-wrap'>
        <div className='header-logo'>
          <Burger />
          <p>MyVideoStream</p>
        </div>
        <NavLink to={`/main/chanal/${userId}`}>
          <UserIcon />
        </NavLink>
      </div>
      <div className='header-search'>
        <input placeholder='Поиск' type='text' />
      </div>
    </header>
  );
}
