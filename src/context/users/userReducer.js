import {
  GET_USERS,
  REGISTER_USER,
  DELETE_USER,
  UPDATE_USER,
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  SET_LOADING,
  USERS_ERROR
} from "../types";

export default (state, action) => {
  switch (action.type) {
    //
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };

    case REGISTER_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
        loading: false
      };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
        loading: false
      };

    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.id ? action.payload : user
        ),
        loading: false
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        current: action.payload
      };

    case CLEAR_CURRENT_USER:
      return {
        ...state,
        current: {}
      };

    case SET_LOADING:
      return {
        ...state,
        loading: true
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
