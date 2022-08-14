const defaultState = {
  user: {},
  subscription: [],
};
const GET_USER_BY_TOKEN = 'GET_USER_BY_TOKEN';
const GET_USER_SUBSCRIPTION = 'GET_USER_SUBSCRIPTION';
export const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_USER_BY_TOKEN:
      return { ...state, user: action.payload };
    case GET_USER_SUBSCRIPTION:
      return { ...state, subscription: [...action.payload] };
    default:
      return state;
  }
};

export const getUserByTokenAction = (payload) => ({
  type: GET_USER_BY_TOKEN,
  payload,
});
export const getUserSubscriptions = (payload) => ({
  type: GET_USER_SUBSCRIPTION,
  payload,
});
