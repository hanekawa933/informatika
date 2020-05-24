const { DataTypes } = require("sequelize");
const db = require("../database/database");

const {
  notNullString,
  nullableString,
  notNullInteger,
  notNullDate,
  notNullText,
} = require("../utils/modelType");

const M_Agama = db.define(
  "agama",
  {
    agama: notNullString(30),
  },
  {
    freezeTableName: true,
  }
);

const M_Divisi = db.define(
  "divisi",
  {
    divisi: notNullString(100),
  },
  {
    freezeTableName: true,
  }
);

const M_Anggota = db.define(
  "anggota",
  {
    nama_depan: notNullString(35),
    nama_belakang: notNullString(35),
    tempat: notNullString(35),
    tgl_lahir: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    agama_id: notNullInteger(),
    nim: notNullString(15),
    jabatan: notNullString(50),
    angkatan: notNullString(4),
    divisi_id: notNullInteger(),
    foto: notNullString(255),
    email: notNullString(30),
    instagram: nullableString(30),
    twitter: nullableString(30),
    facebook: nullableString(30),
    whatsapp: notNullString(30),
    created_by: notNullString(35),
    updated_by: nullableString(35),
  },
  {
    freezeTableName: true,
  }
);

M_Anggota.belongsTo(M_Divisi, {
  foreignKey: "divisi_id",
});

M_Divisi.hasMany(M_Anggota, {
  foreignKey: "divisi_id",
});

M_Anggota.belongsTo(M_Agama, {
  foreignKey: "agama_id",
});

M_Agama.hasMany(M_Anggota, {
  foreignKey: "agama_id",
});

module.exports = {
  M_Agama,
  M_Anggota,
  M_Divisi,
};
