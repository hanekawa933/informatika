import { GET_EVENT, GET_SINGLE_EVENT, GET_ERROR } from "../../types/event/read";
import axios from "axios";

export const readEvent = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/event");
    dispatch({
      type: GET_EVENT,
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

export const eventDetail = (nama_event) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/event/${nama_event}`);
    dispatch({
      type: GET_SINGLE_EVENT,
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
