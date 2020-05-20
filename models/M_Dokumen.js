const db = require("../database/database");
const { DataTypes } = require("sequelize");

const {
  notNullString,
  nullableString,
  notNullInteger,
  notNullDate,
  notNullText,
} = require("../utils/modelType");

const M_Dokumen = db.define(
  "dokumen",
  {
    nama: notNullString(70),
    description: notNullText(),
    jenis_file: notNullString(20),
    tipe_file: notNullString(20),
    file: notNullString(255),
    created_by: notNullString(35),
    updated_by: nullableString(35),
  },
  {
    freezeTableName: true,
  }
);

module.exports = M_Dokumen;
