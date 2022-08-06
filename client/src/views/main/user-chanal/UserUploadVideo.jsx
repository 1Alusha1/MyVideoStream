import { useState } from 'react';
import {useSelector} from 'react-redux'
import User from '../../../async/user';
export default function UserUploadVideo() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState('');
  const [videofile, setVideofile] = useState('');
  const id = useSelector(state=> state.userReducer.user.id)
  const uploadVideo = (e) => {
    e.preventDefault();
    const userData = {
      id,
      name,
      description,
      preview,
      videofile,
    };
    User.uploadVideo(userData);
  };

  return (
    <div className='user-upload-video'>
      <form onSubmit={(e) => uploadVideo(e)} className='form'>
        <label className='form-item'>
          <p>Выбрать превью</p>
          <label htmlFor='preview' className='custom-file-upload'>
            Загрузить файл
          </label>
          <input
            type='file'
            id='preview'
            className='file-upload mb-15'
            name='preview'
            onChange={(e) => setPreview(e.target.files[0])}
          />
        </label>
        <label className='form-item'>
          <p>Выбрать видео</p>
          <label htmlFor='videofile' className='custom-file-upload'>
            Загрузить файл
          </label>
          <input
            type='file'
            id='videofile'
            className='file-upload mb-15'
            name='videofile'
            onChange={(e) => setVideofile(e.target.files[0])}
          />
        </label>
        <label className='form-item'>
          <p>Название</p>
          <input
            className='mb-15'
            onChange={(e) => setName(e.target.value)}
            name='name'
            type='text'
          />
        </label>
        <label className='form-item'>
          <p>Описание</p>
          <textarea
            className='mb-15'
            name='description'
            onChange={(e) => setDescription(e.target.value)}
            cols='30'
            rows='10'
          ></textarea>
        </label>
        <input type='submit' value='Загрузить' />
      </form>
    </div>
  );
}
