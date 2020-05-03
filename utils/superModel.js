const db = require("../database/database");
const { DataTypes } = require("sequelize");
const {
  notNullString,
  nullableString,
  notNullInteger,
  notNullDate,
  notNullText,
} = require("../utils/modelType");

const superModel = (model) => {
  return db.define(
    model,
    {
      username: notNullString(15),
      password: notNullString(255),
      nama: notNullString(35),
    },
    {
      freezeTableName: true,
      onDelete: "CASCADE",
    }
  );
};

const penanggungJawab = (model) => {
  return db.define(
    model,
    {
      username: notNullString(15),
      password: notNullString(255),
      nama: notNullString(35),
      created_by: nullableString(35),
      updated_by: nullableString(35),
    },
    {
      freezeTableName: true,
    }
  );
};

module.exports = { superModel, penanggungJawab };
