import { useParams,NavLink } from "react-router-dom";

export default function UserChanal() {
  const params =useParams()
  return <div className='user-chanal'>
    <div className="user-chanal-header">
      <ul className="user-chanal-list">
          <NavLink to={`/main/chanal/${params.id}/upload-video`}>
            Загрузить видео
          </NavLink>
          <NavLink to={`/main/chanal/${params.id}/video`}>
            ваши видео
          </NavLink>
      </ul>
    </div>
    {params.id}
  </div>;
}
