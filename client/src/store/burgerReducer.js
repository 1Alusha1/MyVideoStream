const defaultState = {
  burgerIsActive: false,
};
const BURGER_IS_ACTIVE = 'BURGER_IS_ACTIVE';
export const burgerReduser = (state = defaultState, action) => {
  switch (action.type) {
    case BURGER_IS_ACTIVE:
      return { ...state, burgerIsActive: !state.burgerIsActive };
    default:
      return state;
  }
};

export const getUserByTokenAction = (payload) => ({
  type: BURGER_IS_ACTIVE,
  payload,
});
