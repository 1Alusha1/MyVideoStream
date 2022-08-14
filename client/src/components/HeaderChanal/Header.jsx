import UserIcon from '../ui/UserIcon';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Burger from '../ui/Burger';
export default function Header() {
  const params = useParams();
  const user = useSelector((state) => state.userReducer.user);
  return (
    <div className='user-chanal-header'>
      <div className='container'>
        <div className='user-chanal-header__info'>
          <Burger />
          <NavLink to={`/main/chanal/${user.id}`}>
            <UserIcon />
          </NavLink>
          <div className='user-chanal-header__detail'>
            <p className='username'>{user.username}</p>
            <p className='followers'>10 подпищиков</p>
          </div>
        </div>

        <ul className='user-chanal-list'>
          {user.id === params.id ? (
            <>
              <NavLink
                className={({ isActive }) => (isActive ? 'active' : '')}
                to={`/main/chanal/${params.id}/upload-video`}
              >
                <button>Загрузить видео</button>
              </NavLink>
              <NavLink
                className={({ isActive }) => (isActive ? 'active' : '')}
                to={`/main/chanal/${params.id}/upload-video`}
              >
                <button>Статистика</button>
              </NavLink>
            </>
          ) : (
            <></>
          )}

          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to={`/main/chanal/${params.id}/upload-video`}
          >
            <button>О канале</button>
          </NavLink>

          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to={`/main/chanal/${params.id}/video`}
          >
            <button>Все видео</button>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
