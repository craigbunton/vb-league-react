import { GET_PLAYERS, SET_LOADING, PLAYERS_ERROR } from "../types";

// ADD_PLAYER
// UPDATE_PLAYER
// DELETE_PLAYER
// SET_CURRENT_PLAYER
// CLEAR_CURRENT_PLAYER

// const initialState = {
//   players: null,
//   loading: false,
//   error: null
// };

export default (state, action) => {
  switch (action.type) {
    //
    case GET_PLAYERS:
      return {
        ...state,
        players: action.payload,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };

    case PLAYERS_ERROR:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};
