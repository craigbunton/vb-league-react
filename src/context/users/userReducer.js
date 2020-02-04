import { GET_USERS, REGISTER_USER, SET_LOADING, USERS_ERROR } from "../types";

// ADD_USER
// UPDATE_USER
// DELETE_USER
// SET_CURRENT_USER
// CLEAR_CURRENT_USER

// const initialState = {
//   users: null,
//   loading: false,
//   error: null
// };

export default (state, action) => {
  switch (action.type) {
    //
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };

    case REGISTER_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
        loading: false
      };

    case USERS_ERROR:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};
