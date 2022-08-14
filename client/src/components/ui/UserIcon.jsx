import { NavLink } from 'react-router-dom';

export default function UserIcon({ username, imgPath, sub }) {
  return (
    <div className='user-icon'>
      {sub ? (
        <>
          <img src='' alt='' />
          {sub.authorname ? <p>{sub.authorname}</p> : ''}
        </>
      ) : (
        <>
          <img src='' alt='' />
          {username ? <p>{username}</p> : ''}
        </>
      )}
    </div>
  );
}
