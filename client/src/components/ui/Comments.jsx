import UserIcon from './UserIcon';
import { Link } from 'react-router-dom';
export default function Comment({ comment }) {
  return (
    <div className='comment'>
      <Link to={`/main/channel/${comment.userId}`}>
        <UserIcon />
      </Link>
      <div className='comment-body'>
        <div className='comments-body__info'>
          <Link to={`/main/channel/${comment.userId}`}>
            <div className='comment-name'>{comment.username}</div>
          </Link>
          <div className='comment-datecreate'>{comment.dateCreate}</div>
        </div>
        <div className='comment-text'>{comment.text}</div>
      </div>
    </div>
  );
}
