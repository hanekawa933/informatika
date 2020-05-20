const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = require("../../middleware/auth");
const { M_Administrator, M_Admin_Divisi } = require("../../models/M_SuperUser");

const { M_Anggota, M_Divisi } = require("../../models/M_Anggota");

const { Op } = require("sequelize");

// Create All Users
router.post("/", auth, async (req, res) => {
  let { username, password, anggota_id } = req.body;
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
      const created = await M_Administrator.findOne({
        username: req.user.usernamee,
      });
      const salt = await bcrypt.genSalt(12);
      password = await bcrypt.hash(password, salt);

      const create = await M_Admin_Divisi.create({
        username,
        password,
        anggota_id,
        created_by: created.nama,
      });

      delete create.dataValues["id"];
      res.status(200).send(create);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Get All Users
router.get("/", auth, async (req, res) => {
  try {
    const user = await M_Admin_Divisi.findAll({
      attributes: { exclude: ["id", "divisi_id"] },
      include: [
        {
          model: M_Anggota,
          required: true,
          attributes: { exclude: ["id"] },
          include: [
            {
              model: M_Divisi,
              required: true,
              attributes: { exclude: ["id"] },
            },
          ],
        },
      ],
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
    const user = await M_Admin_Divisi.findOne({
      where: { username: req.params.username },
      attributes: { exclude: ["id"] },
      include: [
        {
          model: M_Anggota,
          required: true,
          attributes: { exclude: ["id"] },
          include: [
            {
              model: M_Divisi,
              required: true,
              attributes: { exclude: ["id"] },
            },
          ],
        },
      ],
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

router.put("/:username", auth, async (req, res) => {
  let { username, password, nama } = req.body;
  try {
    const admin = await M_Administrator.findOne({
      where: { username: req.params.username },
    });
    const divisi = await M_Admin_Divisi.findOne({
      where: { username: req.params.username },
    });

    if (!admin && !divisi) {
      res.status(400).json({
        errors: [
          {
            msg: "User doesn't exists",
          },
        ],
      });
    } else {
      if (admin) {
        const isAvailable = await M_Administrator.findOne({
          where: {
            [Op.and]: [
              {
                username,
              },
              { username: { [Op.not]: admin.username } },
            ],
          },
        });

        const isAvailable2 = await M_Admin_Divisi.findOne({
          where: { username },
        });
        if (isAvailable || isAvailable2) {
          res.status(400).json({
            errors: [
              {
                msg: "Username already exists",
              },
            ],
          });
        } else {
          const salt = await bcrypt.genSalt(12);
          password = await bcrypt.hash(password, salt);
          const user = await M_Administrator.update(
            {
              username,
              password,
              nama,
            },
            { where: { username: req.params.username } }
          );
          res.status(200).send(user);
        }
      } else {
        const isAvailable = await M_Administrator.findOne({
          where: { username },
        });
        const isAvailable2 = await M_Admin_Divisi.findOne({
          where: {
            [Op.and]: [
              {
                username,
              },
              { username: { [Op.not]: divisi.username } },
            ],
          },
        });
        if (isAvailable || isAvailable2) {
          res.status(400).json({
            errors: [
              {
                msg: "Username already exists",
              },
            ],
          });
        } else {
          const salt = await bcrypt.genSalt(12);
          password = await bcrypt.hash(password, salt);
          const user = await M_Admin_Divisi.update(
            {
              username,
              password,
            },
            { where: { username: req.params.username } }
          );
          res.status(200).send(user);
        }
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:username", auth, async (req, res) => {
  try {
    const isExists = await model.findOne({
      where: { id: req.params.id },
    });

    if (!isExists) {
      res
        .status(400)
        .send({ errors: { msg: "There is no user with that ID" } });
    } else {
      const user = await model.destroy({
        where: { id: req.params.id },
      });
      res.status(200).send("Sucessfully Deleted");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
