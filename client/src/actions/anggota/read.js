import {
  GET_ANGGOTA,
  GET_SINGLE_ANGGOTA,
  GET_ERROR,
} from "../../types/anggota/read";
import axios from "axios";

export const readAnggota = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/anggota");
    dispatch({
      type: GET_ANGGOTA,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const profileAnggota = (nim) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/anggota/${nim}`);
    dispatch({
      type: GET_SINGLE_ANGGOTA,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
