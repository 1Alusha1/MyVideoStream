import { useState } from 'react';
import user from '../async/user';

export default function Search() {
  const [videoName, setVideoName] = useState();
  const search = (e) => {
    e.preventDefault();
    user.search(videoName).then((data) => {
      data.message
        ? alert(data.message)
        : (window.location = `/main/video/${data._id}`);
    });
  };

  return (
    <div className='header-search'>
      <form onSubmit={(e) => search(e)}>
        <input
          onChange={(e) => setVideoName(e.target.value)}
          placeholder='Поиск'
          type='text'
        />
      </form>
    </div>
  );
}
