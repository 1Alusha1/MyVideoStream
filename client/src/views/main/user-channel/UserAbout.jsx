import { useParams, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import userAsync from '../../../async/user';
export default function UserAbout() {
  const params = useParams();
  const user = useSelector((state) => state.userReducer.user);
  const [about, setAbout] = useState([]);

  const [aboutText, setAboutText] = useState('');
  const [newLink, setNewLink] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [addLink, setAddLink] = useState(false);

  const changeAbout = (e) => {
    e.preventDefault();
    userAsync
      .setAboutText({
        id: params.id,
        aboutText: aboutText,
      })
      .then((data) => {
        console.log(data);
      });

    setShowForm(!showForm);

    userAsync.getAboutInfo(params.id).then((data) => {
      setAbout(data);
    });
  };

  const setLink = (e) => {
    e.preventDefault();
    userAsync
      .setAboutLink({
        id: params.id,
        link: newLink,
      })
      .then((data) => {
        console.log(data);
      });

    setAddLink(!addLink);

    userAsync.getAboutInfo(params.id).then((data) => {
      setAbout(data);
    });
  };

  const pretyLink = (link) => {
    return link.split('/')[2];
  };
  pretyLink('https://metanit.com/nosql/mongodb/2.9.php');
  useEffect(() => {
    userAsync.getAboutInfo(params.id).then((data) => {
      setAbout(data);
    });
  }, []);

  return (
    <>
      {params.id === user.id ? (
        <>
          <button onClick={() => setShowForm(!showForm)}>Изменить</button>
          <button onClick={() => setAddLink(!addLink)}>Добавить ссылку</button>
        </>
      ) : (
        ''
      )}
      <h2>О канале:</h2>
      {showForm ? (
        <form onSubmit={(e) => changeAbout(e)}>
          <textarea onChange={(e) => setAboutText(e.target.value)}></textarea>
          <input type='submit' value='Изменить' />
        </form>
      ) : (
        about.text && <div className='about-channel'>{about.text}</div>
      )}
      <h2>Социальные сети:</h2>
      {about.link && (
        <div className='about-channel'>
          {about.link.map((item, idx) => {
            return (
              <>
                <a href={item}>{pretyLink(item)}</a>
                <br />
              </>
            );
          })}
        </div>
      )}

      {addLink && (
        <form onSubmit={(e) => setLink(e)}>
          <input
            type='text'
            onChange={(e) => setNewLink(e.target.value)}
            placeholder='Ссылка'
          />
          <input type='submit' value='Добавить' />
        </form>
      )}

      <div className='author-social'></div>
    </>
  );
}
