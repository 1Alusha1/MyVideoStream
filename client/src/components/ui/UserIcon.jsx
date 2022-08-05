export default function UserIcon({ username, imgPath }) {
  return (
    <div className='user-icon'>
      <img src='' alt='' />
      {username ? <p>{username}</p> : ''}
    </div>
  );
}
