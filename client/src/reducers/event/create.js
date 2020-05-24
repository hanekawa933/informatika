import { EVENT_CREATED, CREATE_ERROR } from "../../types/event/create";

const initialState = {
  event: [],
  success: null,
  errors: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case EVENT_CREATED:
      return {
        ...state,
        success: true,
        event: payload,
      };
    case CREATE_ERROR:
      return {
        ...state,
        success: false,
        event: [],
        errors: payload,
      };
    default:
      return state;
  }
}
