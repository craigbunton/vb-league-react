import React, { useReducer } from "react";
import axios from "axios";
import UserContext from "./userContext";
import userReducer from "./userReducer";

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

const UserState = props => {
  const initialState = {
    users: null,
    current: {
      firstName: "",
      lastName: "",
      playerName: "",
      email: "",
      phone: "",
      password: "",
      active: false
    },
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  //Get Users
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
      setLoading();
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

  // Delete a user
  const deleteUser = async id => {
    try {
      setLoading();
      await axios.delete(`/users/${id}`);

      dispatch({
        type: DELETE_USER,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: USERS_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update user
  const updateUser = async user => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      setLoading();
      const res = await axios.put(`/users/${user.id}`, user, config);

      dispatch({
        type: UPDATE_USER,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: USERS_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Set Current User for updating
  const setCurrentUser = user => {
    dispatch({ type: SET_CURRENT_USER, payload: user });
  };

  // Clear Current User
  const clearCurrentUser = () => {
    dispatch({ type: CLEAR_CURRENT_USER });
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
        current: state.current,
        loading: state.loading,
        error: state.error,
        getUsers,
        registerUser,
        deleteUser,
        updateUser,
        setCurrentUser,
        clearCurrentUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserState;
