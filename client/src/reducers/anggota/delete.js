import { ANGGOTA_DELETED, DELETE_ERROR } from "../../types/anggota/delete";

const initialState = {
  success: null,
  message: "",
  errors: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ANGGOTA_DELETED:
      return {
        ...state,
        success: true,
        message: payload,
      };
    case DELETE_ERROR:
      return {
        ...state,
        success: false,
        errors: payload,
      };
    default:
      return state;
  }
}
