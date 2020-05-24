import {
  GET_ANGGOTA,
  GET_ERROR,
  GET_SINGLE_ANGGOTA,
} from "../../types/anggota/read";

const initialState = {
  anggota: [],
  profile: [],
  errors: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SINGLE_ANGGOTA:
      return {
        ...state,
        profile: payload,
      };
    case GET_ANGGOTA:
      return {
        ...state,
        anggota: payload,
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
