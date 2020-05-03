"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await Promise.all([
      queryInterface.bulkInsert("administrator", [
        {
          username: "admin",
          password: await bcrypt.hash("admin", await bcrypt.genSalt(12)),
          nama: "Administrator",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]),

      queryInterface.bulkInsert("agama", [
        {
          agama: "Islam",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          agama: "Kristen Protestan",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          agama: "Kristen Katolik",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          agama: "Hindu",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          agama: "Budha",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          agama: "Konghucu",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    return await Promise.all([
      queryInterface.bulkDelete("administrator", null, {}),
      queryInterface.bulkDelete("agama", null, {}),
    ]);
  },
};
