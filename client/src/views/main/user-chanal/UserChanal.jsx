import { useParams} from "react-router-dom";

export default function UserChanal() {
  const params =useParams()
  return <div className='user-chanal'>
    {params.id}
  </div>;
}
