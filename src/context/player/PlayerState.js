import React, { useReducer } from "react";
// import axios from "axios";
import PlayerContext from "./playerContext";
import playerReducer from "./playerReducer";

import { GET_PLAYERS, SET_LOADING, PLAYERS_ERROR } from "../types";

// ADD_PLAYER
// UPDATE_PLAYER
// DELETE_PLAYER
// SET_CURRENT_PLAYER
// CLEAR_CURRENT_PLAYER

const PlayerState = props => {
  const initialState = {
    players: null,
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(playerReducer, initialState);

  //Get Players
  const getPlayers = async () => {
    try {
      setLoading();
      const res = await fetch("/players");
      const data = await res.json();

      dispatch({
        type: GET_PLAYERS,
        payload: data
      });
    } catch (err) {
      dispatch({
        type: PLAYERS_ERROR,
        payload: err.response.statusText
      });
    }
  };

  // Set loading to true
  const setLoading = () => {
    return {
      type: SET_LOADING
    };
  };

  return (
    <PlayerContext.Provider
      value={{
        players: state.players,
        getPlayers
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};
export default PlayerState;
