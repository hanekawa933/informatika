import { ANGGOTA_CREATED, CREATE_ERROR } from "../../types/anggota/create";

import axios from "axios";

export const createAnggota = ({
  nama_depan,
  nama_belakang,
  tempat,
  tgl_lahir,
  agama_id,
  nim,
  jabatan,
  angkatan,
  divisi_id,
  foto,
  email,
  instagram,
  twitter,
  facebook,
  whatsapp,
}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    nama_depan,
    nama_belakang,
    tempat,
    tgl_lahir,
    agama_id,
    nim,
    jabatan,
    angkatan,
    divisi_id,
    foto,
    email,
    instagram,
    twitter,
    facebook,
    whatsapp,
  });
  try {
    const res = await axios.post("/api/anggota", body, config);
    dispatch({
      type: ANGGOTA_CREATED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ERROR,
    });
  }
};
