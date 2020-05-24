import axios from "axios";
import { DOKUMEN_CREATED, CREATE_ERROR } from "../../types/dokumen/create";

export const createDokumen = ({
  nama,
  description,
  jenis_file,
  tipe_file,
  file,
}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    nama,
    description,
    jenis_file,
    tipe_file,
    file,
  });

  try {
    const res = await axios.post("/api/dokumen", body, config);
    dispatch({
      type: DOKUMEN_CREATED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ERROR,
    });
  }
};
