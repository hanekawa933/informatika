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

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: [],
  data: null,
  success: null,
  check: null,
  errors: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_PASSWORD:
      return {
        ...state,
        data: payload,
        success: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        check: false,
        user: payload,
      };
    case CHANGE_USERNAME:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        success: true,
        check: true,
        loading: false,
      };
    case CHANGE_FAILED:
      return {
        ...state,
        loading: false,
        errors: payload,
        success: false,
      };
    case AUTH_ERROR:
    case LOGOUT:
    case LOGIN_FAILED:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        check: false,
        loading: false,
        errors: payload,
      };
    default:
      return state;
  }
}
