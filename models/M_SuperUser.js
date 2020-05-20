const { superModel, penanggungJawab } = require("../utils/superModel");
const { M_Anggota } = require("./M_Anggota");
const M_Administrator = superModel("administrator");
const M_Admin_Divisi = penanggungJawab("admin_divisi");

M_Admin_Divisi.belongsTo(M_Anggota, {
  foreignKey: "anggota_id",
  onDelete: "CASCADE",
});

M_Anggota.hasOne(M_Admin_Divisi, {
  foreignKey: "anggota_id",
  onDelete: "CASCADE",
});

module.exports = { M_Administrator, M_Admin_Divisi };
