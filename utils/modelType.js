const { DataTypes } = require("sequelize");

const notNullString = (range) => {
  return {
    type: DataTypes.STRING(range),
    allowNull: false,
  };
};

const nullableString = (range) => {
  return {
    type: DataTypes.STRING(30),
  };
};

const notNullInteger = (range) => {
  return {
    type: DataTypes.INTEGER(range),
    allowNull: false,
  };
};

const notNullDate = () => {
  return {
    type: DataTypes.DATE(),
    allowNull: false,
  };
};

const notNullText = () => {
  return {
    type: DataTypes.TEXT,
    allowNull: false,
  };
};

module.exports = {
  notNullString,
  nullableString,
  notNullInteger,
  notNullDate,
  notNullText,
};
