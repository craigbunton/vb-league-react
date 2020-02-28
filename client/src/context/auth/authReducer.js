import {
  GET_USERS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  DELETE_USER,
  UPDATE_USER,
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  SET_USER_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AUTH_ERROR,
  CLEAR_ERRORS
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

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
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

    case SET_USER_LOADING:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
};
