import user from '../../../async/user';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Video from '../../../components/Video';
import UserIcon from '../../../components/ui/UserIcon';

export default function UserVideo() {
  const params = useParams();
  const [video, setVideo] = useState([]);
  useEffect(() => {
    user.getUserVideo(params.id).then((data) => {
      setVideo(data);
    });
  }, []);

  console.log(video);
  return (
    <div className='user-video'>
      {video.length ? (
        <>
          <div className='video-file'>
            <div className='video-file__wrapper'>
              <video
                controls
                src={`http://localhost:3001/api/user/getVideoFile/${video[0].videoPath}`}
              ></video>
              <div className='user-video__name'>{video[0].name}</div>
              <div className='user-video__detail-stat'>
                <div className='video-detail__views'>{video[0].views}</div>
                <div className='video-detail__date-create'>
                  {video[0].dateCreate}
                </div>
              </div>
              <div className='user-video__description'>
                {video[0].description}
              </div>

              <div className='user-video__contols'>
                <div className='like'>
                  <p>{video[0].like}</p> <button>Наравиться</button>
                </div>
                <div className='dislike'>
                  <p>{video[0].dislike}</p> <button>Не наравиться</button>
                </div>
              </div>

              <div className='user-video__user'>
                <UserIcon username={video[0].username} />
                <button>Подписаться</button>
              </div>

              <div className='comments'>
                <form>
                  <div className='form-item'>
                    <textarea placeholder='Написать коментарий' name='' id='' cols='30' rows='10'></textarea>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className='user-videos video-column'>
            <Video className='video-single' video={video[0]} />
            <Video className='video-single' video={video[0]} />
            <Video className='video-single' video={video[0]} />
            <Video className='video-single' video={video[0]} />
            <Video className='video-single' video={video[0]} />
          </div>
        </>
      ) : (
        'Загрузка'
      )}
    </div>
  );
}
