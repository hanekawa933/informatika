const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = require("../../middleware/auth");
const { M_Administrator, M_Admin_Divisi } = require("../../models/M_SuperUser");

const { Op } = require("sequelize");

// Create Akun Admin
router.post("/", auth, async (req, res) => {
  let { username, password, nama } = req.body;
  try {
    // See if user exists
    const admin = await M_Administrator.findOne({ where: { username } });
    const divisi = await M_Admin_Divisi.findOne({ where: { username } });

    if (admin || divisi) {
      res.status(400).json({
        errors: [
          {
            msg: "User already exists",
          },
        ],
      });
    } else {
      const salt = await bcrypt.genSalt(12);
      password = await bcrypt.hash(password, salt);

      const admin = await M_Administrator.create({
        username,
        password,
        nama,
      });

      delete admin.dataValues["id"];
      res.status(200).send(admin);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get All Users
router.get("/", auth, async (req, res) => {
  try {
    const user = await M_Administrator.findAll({
      attributes: { exclude: ["id"] },
    });
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get Single Users
router.get("/:username", auth, async (req, res) => {
  try {
    const user = await M_Administrator.findOne({
      where: { username: req.params.username },
      attributes: { exclude: ["id"] },
    });
    if (!user) {
      res.status(400).json({
        errors: [
          {
            msg: "User Not Found",
          },
        ],
      });
    } else {
      res.json(user);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Delete Data User
router.delete("/:username", auth, async (req, res) => {
  try {
    const isExists = await M_Administrator.findOne({
      where: { username: req.params.username },
    });

    if (!isExists) {
      res
        .status(400)
        .send({ errors: { msg: "There is no user with that username" } });
    } else {
      const user = await M_Administrator.destroy({
        where: { username: req.params.username },
      });
      res.status(200).send("Admin Sucessfully Deleted");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
