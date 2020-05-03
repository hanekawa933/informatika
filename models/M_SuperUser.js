const { superModel, penanggungJawab } = require("../utils/superModel");
const M_Administrator = superModel("administrator");
const M_pjAnggota = penanggungJawab("pjAnggota");
const M_pjDokumen = penanggungJawab("pjDokumen");
const M_pjEvent = penanggungJawab("pjEvent");

module.exports = { M_Administrator, M_pjAnggota, M_pjDokumen, M_pjEvent };
