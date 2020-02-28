import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import setAuthToken from "../../utils/setAuthToken";

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

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    users: null,
    current: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      active: false
    },
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //Get Users
  const getUsers = async () => {
    try {
      setLoading();
      const res = await axios.get("/api/users");

      // console.log("getUsers res: ", res.data.users);

      dispatch({
        type: GET_USERS,
        payload: res.data.users
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.msg
      });
    }
  };

  // Load User
  // (INTERNAL METHOD)
  const loadUser = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get("/api/auth");
      console.log("loadUser res: ", res.data);

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // Register a new user
  const registerUser = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    try {
      setLoading();

      console.log("Register New User formData: ", formData);

      const res = await axios.post("/api/users", formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.msg
      });
    }
  };

  // Delete a user
  const deleteUser = async id => {
    try {
      setLoading();
      await axios.delete(`/api/users/${id}`);

      dispatch({
        type: DELETE_USER,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
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
      const res = await axios.put(`/api/users/${user.id}`, user, config);

      dispatch({
        type: UPDATE_USER,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
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

  // Login User
  const login = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      console.log("formData: ", formData);
      console.log("config: ", config);

      const res = await axios.post("/api/auth", formData, config);

      console.log("Login user axios res: ", res);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadUser();

      clearErrors();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  // Set loading to true
  // (INTERNAL METHOD)
  const setLoading = () => {
    return {
      type: SET_USER_LOADING
    };
  };

  return (
    <AuthContext.Provider
      value={{
        users: state.users,
        current: state.current,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        getUsers,
        registerUser,
        deleteUser,
        updateUser,
        setCurrentUser,
        clearCurrentUser,
        login,
        logout,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
