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
          <a href={`/main/channel/${user.id}/video`}>
            <UserIcon />
          </a>
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
                to={`/main/channel/${params.id}/upload-video`}
              >
                <button>Загрузить видео</button>
              </NavLink>
            </>
          ) : (
            <></>
          )}

          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to={`/main/channel/${params.id}/about`}
          >
            <button>О канале</button>
          </NavLink>

          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to={`/main/channel/${params.id}/video`}
          >
            <button>Все видео</button>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
