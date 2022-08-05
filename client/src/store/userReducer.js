const defaultState = {
  user: {},
};
const GET_USER_BY_TOKEN = 'GET_USER_BY_TOKEN';
export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_USER_BY_TOKEN:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const getUserByTokenAction = (payload) => ({
  type: GET_USER_BY_TOKEN,
  payload,
});
