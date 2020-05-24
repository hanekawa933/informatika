import axios from "axios";

import setAuthToken from "../utils/setAuthToken";

import {
  AUTH_ERROR,
  CHANGE_PASSWORD,
  CHANGE_USERNAME,
  CHANGE_FAILED,
} from "../types/auth";

import {
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
} from "../types/login";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Login User
export const login = (username, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ username, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    // const errors = err.response.data.errors;

    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    // }

    dispatch({
      type: LOGIN_FAILED,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

// Change Password
export const changePassword = (username, password, newPassword) => async (
  dispatch
) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const body = JSON.stringify({ password, newPassword });

  try {
    const res = await axios.put(`/api/auth/password/${username}`, body, config);
    dispatch({
      type: CHANGE_PASSWORD,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_FAILED,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

// Change Password
export const changeUsername = (usernameParams, username, password) => async (
  dispatch
) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const body = JSON.stringify({ username, password });

  try {
    const res = await axios.put(`/api/auth/${usernameParams}`, body, config);
    dispatch({
      type: CHANGE_USERNAME,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_FAILED,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
