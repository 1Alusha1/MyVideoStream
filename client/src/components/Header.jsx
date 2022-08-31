import Burger from './ui/Burger';
import UserIcon from './ui/UserIcon';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Search from './Search';
export default function Header() {
  const userId = useSelector((state) => state.userReducer.user.id);

  return (
    <header className='header'>
      <div className='header-wrap'>
        <div className='header-logo'>
          <Burger />
          <p>MyVideoStream</p>
        </div>
        <NavLink to={`/main/channel/${userId}/video`}>
          <UserIcon />
        </NavLink>
      </div>
      <Search />
    </header>
  );
}
