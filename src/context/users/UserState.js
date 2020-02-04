import React, { useReducer } from "react";
import axios from "axios";
import UserContext from "./userContext";
import userReducer from "./userReducer";

import { GET_USERS, REGISTER_USER, SET_LOADING, USERS_ERROR } from "../types";

// ADD_USER
// UPDATE_USER
// DELETE_USER
// SET_CURRENT_USER
// CLEAR_CURRENT_USER

const UserState = props => {
  const initialState = {
    users: null,
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  //Get Players
  const getUsers = async () => {
    try {
      setLoading();
      const res = await axios.get("/users");
      // const data = await res.json();

      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: USERS_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Register a new user
  const registerUser = async newUser => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      const res = await axios.post("/users", newUser, config);
      dispatch({
        type: REGISTER_USER,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: USERS_ERROR,
        payload: err.response.msg
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
    <UserContext.Provider
      value={{
        users: state.users,
        getUsers,
        registerUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserState;
