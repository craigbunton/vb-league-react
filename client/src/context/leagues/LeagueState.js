import React, { useReducer } from "react";
import axios from "axios";
import LeagueContext from "./leagueContext";
import leagueReducer from "./leagueReducer";

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

const LeagueState = props => {
  const initState = {
    leagues: null,
    current: {
      name: "",
      location: "",
      active: false,
      startDate: null,
      endDate: null,
      leaguePlayers: {},
      games: {}
    },
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(leagueReducer, initState);

  // GET_LEAGUES,
  const getLeagues = async () => {
    try {
      setLoading();
      const res = await axios.get("/leagues");
      console.log("getLeagues action res.data: ", res.data);

      dispatch({
        type: GET_LEAGUES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: LEAGUE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // ADD_LEAGUE,
  const addLeague = async newLeague => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      setLoading();
      const res = await axios.post("/leagues", newLeague, config);
      dispatch({
        type: ADD_LEAGUE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: LEAGUE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // UPDATE_LEAGUE,
  const updateLeague = async league => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      setLoading();
      const res = await axios.put(`/leagues/${league.id}`, league, config);

      dispatch({
        type: UPDATE_LEAGUE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: LEAGUE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // DELETE_LEAGUE,
  const deleteLeague = async id => {
    try {
      setLoading();
      await axios.delete(`/leagues/${id}`);

      dispatch({
        type: DELETE_LEAGUE,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: LEAGUE_ERROR,
        payload: err.response.msg
      });
    }
  };

  // SET_CURRENT_LEAGUE,
  const setCurrentLeague = league => {
    dispatch({ type: SET_CURRENT_LEAGUE, payload: league });
  };

  // CLEAR_CURRENT_LEAGUE,
  const clearCurrentLeague = () => {
    dispatch({ type: CLEAR_CURRENT_LEAGUE });
  };

  // SET_LEAGUE_LOADING,
  const setLoading = () => {
    return {
      type: SET_LEAGUE_LOADING
    };
  };

  return (
    <LeagueContext.Provider
      value={{
        leagues: state.leagues,
        current: state.current,
        loading: state.loading,
        error: state.error,
        getLeagues,
        addLeague,
        deleteLeague,
        updateLeague,
        setCurrentLeague,
        clearCurrentLeague
      }}
    >
      {props.children}
    </LeagueContext.Provider>
  );
};

export default LeagueState;
