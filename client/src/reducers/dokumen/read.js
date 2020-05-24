import {
  GET_DOKUMEN,
  GET_ERROR,
  GET_SINGLE_DOKUMEN,
} from "../../types/dokumen/read";

const initialState = {
  dokumen: [],
  errors: null,
  detail: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SINGLE_DOKUMEN:
      return {
        ...state,
        detail: payload,
      };
    case GET_DOKUMEN:
      return {
        ...state,
        dokumen: payload,
      };
    case GET_ERROR:
      return {
        ...state,
        errors: payload,
      };
    default:
      return state;
  }
}
