import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import UserIcon from './ui/UserIcon';
import { useDispatch } from 'react-redux';
export default function Sidebar() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userReducer.user.id);
  const burgerIsActive = useSelector(
    (state) => state.burgerReduser.burgerIsActive
  );
  const subscription = useSelector((state) => state.userReducer.subscription);

  return (
    <div className={burgerIsActive ? 'sidebar active' : 'sidebar'}>
      <ul className='sidebar-list'>
        <NavLink
          className={({ isActive }) => (isActive ? 'active' : '')}
          to='/main'
          onClick={() => dispatch({ type: 'BURGER_IS_ACTIVE' })}
        >
          <li>Главная</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'active' : '')}
          to='/main/subscriptions'
          onClick={() => dispatch({ type: 'BURGER_IS_ACTIVE' })}
        >
          <li>Подписки</li>
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'active' : '')}
          to={`/main/chanal/${userId}`}
          onClick={() => dispatch({ type: 'BURGER_IS_ACTIVE' })}
        >
          <li>Ваш канал</li>
        </NavLink>
      </ul>
      <hr />
      <div className='subscribers'>
        <div className='subscribers-title'>Подписки</div>
        <ul className='subscribers-list'>
          {subscription.length ? (
            subscription.map((sub) => (
              <NavLink
                onClick={() => dispatch({ type: 'BURGER_IS_ACTIVE' })}
                key={sub.authorId}
                to={`/main/chanal/${sub.authorId}`}
              >
                <UserIcon sub={sub} />
              </NavLink>
            ))
          ) : (
            <p>Подписок нет</p>
          )}
        </ul>
      </div>
    </div>
  );
}
