import { useEffect, useState } from 'react';
import user from '../../async/user';
import Video from '../../components/Video';
export default function Main() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    user.getAllVideo().then((data) => {
      console.log(data);
      setVideos(data);
    });
  }, []);

  return (
    <div className='main'>
      <h1 className='main-title'>Видео со всех каналов:</h1>
      <div className='user-videos'>
        {videos.length ? (
          videos.map((video) => {
            return <Video key={video._id} video={video} />;
          })
        ) : (
          <p>Видео нет</p>
        )}
      </div>
    </div>
  );
}
