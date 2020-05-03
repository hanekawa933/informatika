const db = require("../database/database");
const { DataTypes } = require("sequelize");

const {
  notNullString,
  nullableString,
  notNullInteger,
  notNullDate,
  notNullText,
} = require("../utils/modelType");

const M_Event = db.define(
  "event",
  {
    nama: notNullString(255),
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    harga: notNullInteger(),
    rules: notNullText(),
    poster: notNullString(),
    lokasi: notNullString(255),
    tanggal: notNullDate(),
    created_by: notNullString(35),
    updated_by: nullableString(35),
  },
  {
    freezeTableName: true,
    onDelete: "CASCADE",
  }
);

const M_Pengunjung = db.define(
  "pengunjung",
  {
    nama_depan: notNullString(35),
    nama_belakang: notNullString(35),
    email: notNullString(100),
    no_telp: notNullString(20),
    validasi: {
      type: DataTypes.STRING(12),
      defaultValue: "Tidak Aktif",
    },
    event_id: notNullInteger(),
  },
  {
    freezeTableName: true,
    onDelete: "CASCADE",
  }
);

const M_Tamu = db.define(
  "tamu",
  {
    nama_tamu_1: notNullString(70),
    nama_tamu_2: nullableString(70),
    nama_tamu_3: nullableString(70),
    event_id: notNullInteger(),
  },
  {
    freezeTableName: true,
    onDelete: "CASCADE",
  }
);

const M_Tiket = db.define(
  "tiket",
  {
    pengunjung_id: notNullInteger(),
  },
  {
    freezeTableName: true,
  }
);

M_Tamu.belongsTo(M_Event, {
  foreignKey: "event_id",
  onDelete: "CASCADE",
});

M_Event.hasOne(M_Tamu, {
  foreignKey: "event_id",
  onDelete: "CASCADE",
});

M_Pengunjung.belongsTo(M_Event, {
  foreignKey: "event_id",
  onDelete: "CASCADE",
});

M_Event.hasMany(M_Pengunjung, {
  foreignKey: "event_id",
  onDelete: "CASCADE",
});

M_Tiket.belongsTo(M_Pengunjung, {
  foreignKey: "pengunjung_id",
  onDelete: "CASCADE",
});

M_Pengunjung.hasOne(M_Tiket, {
  foreignKey: "pengunjung_id",
  onDelete: "CASCADE",
});

module.exports = {
  M_Event,
  M_Pengunjung,
  M_Tiket,
  M_Tamu,
};
