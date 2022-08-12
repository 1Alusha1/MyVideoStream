import user from '../../../async/user';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Video from '../../../components/Video';
import UserIcon from '../../../components/ui/UserIcon';
import { useSelector } from 'react-redux';
import videoAsync from '../../../async/video';

export default function UserVideo() {
  const params = useParams();
  const [video, setVideo] = useState([]);
  let [like, setLike] = useState();
  let [disLike, setdisLike] = useState();
  const curentUser = useSelector((state) => state.userReducer.user.id);
  useEffect(() => {
    user.getUserVideo(params.id).then((data) => {
      setVideo(data);
      setLike(data[0].like);
      setdisLike(data[0].dislike);
    });
  }, []);

  const sendLike = () => {
    videoAsync.like({ id: params.id, userId: curentUser }).then((data) => {
      data.message === 'Лайк Поставлен'
        ? setLike((like += 1))
        : setLike((like -= 1));
    });
  };
  const sendDisLike = () => {
    videoAsync.disLike({ id: params.id, userId: curentUser }).then((data) => {
      data.message === 'Дизлайк Поставлен'
        ? setdisLike((disLike += 1))
        : setdisLike((disLike -= 1));
    });
  };
  const subscribe = () => {
    videoAsync
      .subscribe({ userId: curentUser, authorId: video[0].authroId })
      .then((data) => {
        console.log(data);
      });
  };
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
                <div className='like' onClick={sendLike}>
                  <p>{like}</p> <button>Наравиться</button>
                </div>
                <div className='dislike' onClick={sendDisLike}>
                  <p>{disLike}</p> <button>Не наравиться</button>
                </div>
              </div>

              <div className='user-video__user'>
                <UserIcon username={video[0].username} />
                <button onClick={subscribe}>Подписаться</button>
              </div>

              <div className='comments'>
                <form>
                  <div className='form-item'>
                    <textarea
                      placeholder='Написать коментарий'
                      name=''
                      id=''
                      cols='30'
                      rows='10'
                    ></textarea>
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
