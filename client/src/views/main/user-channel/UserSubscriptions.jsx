import userAsync from '../../../async/user';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import Video from '../../../components/Video';
export default function UserSubscriptions() {
  const params = useParams();
  const [subscribersVideo, setSubscribersVideo] = useState([]);
  useEffect(() => {
    userAsync.getUserSubscriptions(params.id).then(async (data) => {
      const getSubscribersVideo = [];
      await data.forEach((users) => getSubscribersVideo.push(users.authorId));

      await userAsync
        .getUserSubscriptionsVideo(getSubscribersVideo)
        .then((userVideo) => {
          setSubscribersVideo([...userVideo]);
        });
    });
  }, []);
  return (
    <div>
      <h1 className='main-title'>Видео с подписаных каналов</h1>

      <div className='user-videos'>
        {subscribersVideo.length ? (
          subscribersVideo.map((video) => {
            return <Video key={video._id} video={video} />;
          })
        ) : (
          <p>Видео нет</p>
        )}
      </div>
    </div>
  );
}
