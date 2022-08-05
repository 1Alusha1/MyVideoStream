import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../async/auth';

export default function Registration() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const register = (e) => {
    e.preventDefault();
    const userData = {
      username,
      password,
    };
    auth.register(userData).then((data) => {
      if (data.errors) {
        alert(data.errors.errors[0].msg);
      } else {
        alert(data.message);
        navigate('/')
      }
    });
  };

  return (
    <form onSubmit={(e) => register(e)} className='auth-form'>
      <label className='form-item'>
        <p>Логин</p>
        <input
          type='text'
          onChange={(e) => setUsername(e.target.value)}
          className='mb-15'
        />
      </label>
      <label className='form-item'>
        <p>Пароль</p>
        <input
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          className='mb-15'
        />
      </label>
      <input type='submit' value='Зарегестрироваться' />
    </form>
  );
}
