import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../async/auth';

export default function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const login = (e) => {
    e.preventDefault();
    const userData = {
      username,
      password,
    };
    auth.login(userData).then((data) => {
      if (data.message) {
        return alert(data.message);
      }
      document.cookie = `token=${data}`;
      navigate('/main');
    });
  };

  return (
    <form onSubmit={(e) => login(e)} className='auth-form'>
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
      <input type='submit' value='Войти' />
    </form>
  );
}
