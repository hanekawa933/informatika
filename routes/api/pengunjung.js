const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = require("../../middleware/auth");
const { M_Administrator, M_Admin_Divisi } = require("../../models/M_SuperUser");

const {
  M_Event,
  M_Pengunjung,
  M_Tiket,
  M_Tamu,
} = require("../../models/M_Event");

// Post Data Pengunjung
router.post("/data/pengunjung/:event_name", auth, async (req, res) => {
  const { nama_depan, nama_belakang, email, no_telp } = req.body;
  try {
    const event_name = await M_Event.findOne({
      where: { nama: req.params.event_name },
    });
    const pengunjung = await M_Pengunjung.create({
      nama_depan,
      nama_belakang,
      email,
      no_telp,
      event_id: event_id.id,
    });
    res.status(200).send(pengunjung);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get Data Pengunjung
router.get("/data/pengunjung", auth, async (req, res) => {
  try {
    const pengunjung = await M_Pengunjung.findAll({
      include: [
        {
          model: M_Event,
          required: true,
          attributes: { exclude: ["id"] },
        },
      ],
      attributes: { exclude: ["id", "event_id"] },
    });
    res.json(pengunjung);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get Single Data Pengunjung
router.get("/data/pengunjung/:email", auth, async (req, res) => {
  try {
    const check = await M_Pengunjung.findOne({
      where: { email: req.params.email },
    });
    if (!check) {
      res
        .status(400)
        .send({ errors: { msg: "There is no Pengunjung with that email" } });
    } else {
      const pengunjung = await M_Pengunjung.findOne({
        include: [
          {
            model: M_Event,
            required: true,
            attributes: { exclude: ["id"] },
          },
        ],
        attributes: { exclude: ["id"] },
      });
      res.json(pengunjung);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Update Data Pengunjung
router.put("/data/pengunjung/:email", auth, async (req, res) => {
  const { nama_depan, nama_belakang, email, no_telp } = req.body;
  try {
    const check = await M_Pengunjung.findOne({
      where: { email: req.params.email },
    });
    if (!check) {
      res
        .status(400)
        .send({ errors: { msg: "There is no Pengunjung with that email" } });
    } else {
      const adminId = await M_Administrator.findByPk(req.user.id);
      const pengunjung = await M_Pengunjung.update(
        {
          nama_depan,
          nama_belakang,
          email,
          no_telp,
        },
        { where: { email: req.params.email } }
      );
      res.status(200).send("Pengunjung Successfully Updated");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Delete Data Pengunjung
router.delete("/data/pengunjung/:id", auth, async (req, res) => {
  try {
    const check = await M_Pengunjung.findOne({
      where: { id: req.params.id },
    });
    if (!check) {
      res
        .status(400)
        .send({ errors: { msg: "There is no Pengunjung with that ID" } });
    } else {
      const pengunjung = await M_Pengunjung.destroy({
        where: { id: req.params.id },
      });
      res.status(200).send("Pengunjung Successfully Deleted");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
