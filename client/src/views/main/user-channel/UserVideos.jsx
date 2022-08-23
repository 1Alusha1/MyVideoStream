import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import user from '../../../async/user';
import Video from '../../../components/Video';
export default function UserVideo() {
  const params = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    user.getUserVideos(params.id).then((data) => {
      setVideos(data);
    });
  }, [videos]);

  return (
    <div className='user-videos'>
      {videos.length ? (
        videos.map((video) => {
          return <Video key={video._id} video={video} />;
        })
      ) : (
        <p>Видео нет</p>
      )}
    </div>
  );
}
