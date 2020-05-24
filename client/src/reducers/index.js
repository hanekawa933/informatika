import { combineReducers } from "redux";
import auth from "./auth";

// Reducers Anggota
import createAnggota from "./anggota/create";
import readAnggota from "./anggota/read";
import deleteAnggota from "./anggota/delete";

// Reducers Dokumen
import createDokumen from "./dokumen/create";
import readDokumen from "./dokumen/read";

// Reducers Event
import createEvent from "./event/create";
import readEvent from "./event/read";

export default combineReducers({
  auth,
  createAnggota,
  readAnggota,
  deleteAnggota,
  createDokumen,
  createEvent,
  readDokumen,
  readEvent,
});
