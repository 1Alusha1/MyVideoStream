import UserIcon from './UserIcon';
import { Link } from 'react-router-dom';

import { correctDate } from '../../use/correctDate';
export default function Comment({ comment }) {
  return (
    <div className='comment'>
      <Link to={`/main/channel/${comment.userId}`}>
        <UserIcon />
      </Link>
      <div className='comment-body'>
        <div className='comments-body__info'>
          <Link to={`/main/channel/${comment.userId}/video`}>
            <div className='comment-name'>{comment.username}</div>
          </Link>
          <div className='comment-datecreate'>{correctDate(Number(comment.dateCreate))}</div>
        </div>
        <div className='comment-text'>{comment.text}</div>
      </div>
    </div>
  );
}
