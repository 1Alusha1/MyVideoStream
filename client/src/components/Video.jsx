import { NavLink, useNavigate, useParams } from 'react-router-dom';
import UserIcon from './ui/UserIcon';

export default function Video({ video, className }) {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div className={className ? `${className} video` : 'video'}>
      <div
        className='video-img'
        onClick={() => navigate(`/main/video/${video._id}`)}
      >
        <img
          src={`http://localhost:3001/api/user/getVideoPreview/${video.previewPath}`}
          alt={video.name}
        />
      </div>
      <div className='video-info'>
        <div className='video-wrapper'>
          <div className='video-author'>
            <NavLink to={`/main/channel/${video.authroId}`}>
              <UserIcon />
            </NavLink>
          </div>
          <div className='video-detail'>
            <div
              className='video-name'
              onClick={() => navigate(`/main/video/${video._id}`)}
            >
              {video.name}
            </div>
            <NavLink to={`/main/channel/${params.id}`}>
              <div className='video-author'>{video.username}</div>
            </NavLink>
            <div className='video-detail-stat'>
              <div className='video-views'>{video.views}</div>
              <div className='video-data-create'>{video.dateCreate}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
