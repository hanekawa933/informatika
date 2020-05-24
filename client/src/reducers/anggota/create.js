import { ANGGOTA_CREATED, CREATE_ERROR } from "../../types/anggota/create";

const initialState = {
  anggota: [],
  success: null,
  errors: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ANGGOTA_CREATED:
      return {
        ...state,
        success: true,
        anggota: payload,
      };
    case CREATE_ERROR:
      return {
        ...state,
        success: false,
        anggota: [],
        errors: payload,
      };
    default:
      return state;
  }
}
