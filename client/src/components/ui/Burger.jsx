import { useDispatch, useSelector } from 'react-redux';

export default function Burger() {
  const dispatch = useDispatch();
  const burgerIsActive = useSelector(
    (state) => state.burgerReduser.burgerIsActive
  );

  return (
    <div
      className='burger'
      onClick={() => dispatch({ type: 'BURGER_IS_ACTIVE' })}
    >
      <span className={burgerIsActive ? 'f active' : 'f'}></span>
      <span className={burgerIsActive ? 's active' : 's'}></span>
      <span className={burgerIsActive ? 'l active' : 'l'}></span>
    </div>
  );
}
