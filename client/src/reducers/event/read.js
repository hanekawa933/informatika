import { GET_EVENT, GET_ERROR, GET_SINGLE_EVENT } from "../../types/event/read";

const initialState = {
  event: [],
  detail: [],
  errors: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SINGLE_EVENT:
      return {
        ...state,
        detail: payload,
      };
    case GET_EVENT:
      return {
        ...state,
        event: payload,
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
