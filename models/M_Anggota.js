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
    onDelete: "CASCADE",
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
    alamat: notNullString(),
    pekerjaan: notNullString(100),
    nim: notNullString(15),
    jabatan: notNullString(50),
    angkatan: notNullString(4),
    foto: notNullString(255),
    created_by: notNullString(35),
    updated_by: nullableString(35),
  },
  {
    freezeTableName: true,
    onDelete: "CASCADE",
  }
);

const M_Sosmed = db.define(
  "sosmed",
  {
    email: notNullString(30),
    instagram: nullableString(30),
    twitter: nullableString(30),
    facebook: nullableString(30),
    whatsapp: notNullString(30),
  },
  {
    freezeTableName: true,
  }
);

// Association
M_Sosmed.belongsTo(M_Anggota, {
  foreignKey: "anggota_id",
  onDelete: "CASCADE",
});

M_Anggota.hasOne(M_Sosmed, {
  foreignKey: "anggota_id",
  onDelete: "CASCADE",
});

M_Anggota.belongsTo(M_Agama, {
  foreignKey: "agama_id",
  onDelete: "CASCADE",
});

M_Agama.hasMany(M_Anggota, {
  foreignKey: "agama_id",
  onDelete: "CASCADE",
});

module.exports = {
  M_Agama,
  M_Anggota,
  M_Sosmed,
};
