import {
  GET_LEAGUES,
  ADD_LEAGUE,
  UPDATE_LEAGUE,
  DELETE_LEAGUE,
  SET_CURRENT_LEAGUE,
  CLEAR_CURRENT_LEAGUE,
  SET_LEAGUE_LOADING,
  LEAGUE_ERROR
} from "../types";

export default (state, action) => {
  switch (action.type) {
    //
    case GET_LEAGUES:
      return {
        ...state,
        leagues: action.payload,
        loading: false
      };

    case ADD_LEAGUE:
      return {
        ...state,
        leagues: [...state.leagues, action.payload],
        loading: false
      };

    case UPDATE_LEAGUE:
      return {
        ...state,
        leagues: state.leagues.map(league =>
          league.id === action.payload.id ? action.payload : league
        ),
        loading: false
      };

    case DELETE_LEAGUE:
      return {
        ...state,
        leagues: state.leagues.filter(league => league.id !== action.payload),
        loading: false
      };

    case SET_CURRENT_LEAGUE:
      return {
        ...state,
        current: action.payload
      };

    case CLEAR_CURRENT_LEAGUE:
      return {
        ...state,
        current: {}
      };

    case SET_LEAGUE_LOADING:
      return {
        ...state,
        loading: true
      };

    case LEAGUE_ERROR:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};
