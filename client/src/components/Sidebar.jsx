import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UserIcon from './ui/UserIcon';

export default function Sidebar() {
  const userId = useSelector((state) => state.userReducer.user.id);
  const burgerIsActive = useSelector(
    (state) => state.burgerReduser.burgerIsActive
  );
  return (
    <div className={burgerIsActive ? 'sidebar active' : 'sidebar'}>
      <ul className='sidebar-list'>
        <NavLink
          className={({ isActive }) => (isActive ? 'active' : '')}
          to='/main'
        >
          <li>Главная</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'active' : '')}
          to='/main/subscriptions'
        >
          <li>Подписки</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'active' : '')}
          to={`/main/chanal/${userId}`}
        >
          <li>Ваш канал</li>
        </NavLink>
      </ul>
      <hr />
      <div className='subscribers'>
        <div className='subscribers-title'>Подписки</div>
        <ul className='subscribers-list'>
          <UserIcon username='Alusha' />
          <UserIcon username='Alusha' />
          <UserIcon username='Alusha' />
          <UserIcon username='Alusha' />
          <UserIcon username='Alusha' />
          <UserIcon username='Alusha' />
          <UserIcon username='Alusha' />
          <UserIcon username='Alusha' />
          <UserIcon username='Alusha' />
          <UserIcon username='Alusha' />
          <UserIcon username='Alusha' />
          <UserIcon username='Alusha' />
          <UserIcon username='Alusha' />
          <UserIcon username='Alusha' />
          <UserIcon username='Alusha' />
        </ul>
      </div>
    </div>
  );
}