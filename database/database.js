const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("hmj", "postgres", "hanekawa", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
