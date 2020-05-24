import axios from "axios";
import { EVENT_CREATED, CREATE_ERROR } from "../../types/event/create";

export const createEvent = ({
  nama,
  description,
  harga,
  rules,
  poster,
  lokasi,
  tanggal,
  jam_mulai,
  jam_berakhir,
  nama_tamu,
}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({
    nama,
    description,
    harga,
    rules,
    poster,
    lokasi,
    tanggal,
    jam_mulai,
    jam_berakhir,
    nama_tamu,
  });

  try {
    const res = await axios.post("/api/event", body, config);
    dispatch({
      type: EVENT_CREATED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ERROR,
    });
  }
};
