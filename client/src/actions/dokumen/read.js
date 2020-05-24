import {
  GET_DOKUMEN,
  GET_SINGLE_DOKUMEN,
  GET_ERROR,
} from "../../types/dokumen/read";
import axios from "axios";

export const readDokumen = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/dokumen");
    dispatch({
      type: GET_DOKUMEN,
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

export const dokumenDetail = ({ nama_dokumen }) => async (dispatch) => {
  try {
    const res = await axios.get(`api/anggota/${nama_dokumen}`);
    dispatch({
      type: GET_SINGLE_DOKUMEN,
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
