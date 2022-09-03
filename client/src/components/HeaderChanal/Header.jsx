import UserIcon from '../ui/UserIcon';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Burger from '../ui/Burger';
import { useEffect, useState } from 'react';
import userAsync from '../../async/user';

export default function Header() {
  const params = useParams();
  const user = useSelector((state) => state.userReducer.user);
  const [followersCount, setFollowersCount] = useState(0);
  useEffect(() => {
    userAsync.getCountFollowers(params.id).then((data) => {
      setFollowersCount(data);
    });
  }, []);

  return (
    <div className='user-chanal-header'>
      <div className='container'>
        <div className='user-chanal-header__info'>
          <Burger />
          <a href={`/main/channel/${user.id}/video`}>
            <UserIcon />
          </a>
          <div className='user-chanal-header__detail'>
            <p className='username'>{followersCount.username}</p>
            <p className='followers'>{followersCount.count} подпищиков</p>
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
