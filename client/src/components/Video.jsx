import { NavLink, useNavigate, useParams } from 'react-router-dom';
import UserIcon from './ui/UserIcon';
import { correctDate } from '../use/correctDate';

export default function Video({ video, className }) {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div className={className ? `${className} video` : 'video'}>
      <div className='video-img'>
        <a href={`/main/video/${video._id}`}>
          <img
            src={`http://localhost:3001/api/user/getVideoPreview/${video.previewPath}`}
            alt={video.name}
          />
        </a>
      </div>
      <div className='video-info'>
        <div className='video-wrapper'>
          <div className='video-author'>
            <a href={`/main/channel/${video.authroId}/video`}>
              <UserIcon />
            </a>
          </div>
          <div className='video-detail'>
            <div className='video-name'>
              <a href={`/main/video/${video._id}`}>{video.name}</a>
            </div>
            <a href={`/main/channel/${video.authroId}/video`}>
              <div className='video-author'>{video.username}</div>
            </a>
            <div className='video-detail-stat'>
              <div className='video-views'>{video.views}</div>
              <div className='video-data-create'>
                {correctDate(Number(video.dateCreate))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
