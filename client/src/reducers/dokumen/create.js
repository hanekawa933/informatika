import { DOKUMEN_CREATED, CREATE_ERROR } from "../../types/dokumen/create";

const initialState = {
  dokumen: [],
  success: null,
  errors: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case DOKUMEN_CREATED:
      return {
        ...state,
        success: true,
        dokumen: payload,
      };
    case CREATE_ERROR:
      return {
        ...state,
        success: false,
        dokumen: [],
        errors: payload,
      };
    default:
      return state;
  }
}
