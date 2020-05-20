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

router.post("/data/event", auth, async (req, res) => {
  const {
    nama,
    description,
    harga,
    rules,
    poster,
    lokasi,
    tanggal,
    nama_tamu,
  } = req.body;
  try {
    const adminId = await M_Administrator.findByPk(req.user.id);
    const event = await M_Event.create({
      nama,
      description,
      harga,
      rules,
      poster,
      lokasi,
      tanggal,
      created_by: adminId.nama,
    });

    const eventId = await M_Event.findOne({
      order: [["createdAt", "DESC"]],
    });

    const tamu = await M_Tamu.create({
      nama_tamu,
      event_id: eventId.id,
    });

    delete event.dataValues["id"];
    delete tamu.dataValues["id"];
    delete tamu.dataValues["event_id"];
    const data = { ...event.dataValues, ...tamu.dataValues };
    res.status(200).send(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get All Event
router.get("/data/event", auth, async (req, res) => {
  try {
    const event = await M_Event.findAll({
      include: [
        {
          model: M_Tamu,
          required: true,
          attributes: { exclude: ["id", "event_id"] },
        },
      ],
      attributes: { exclude: ["id"] },
    });
    res.json(event);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get Single Event
router.get("/data/event/:nama", auth, async (req, res) => {
  try {
    const check = await M_Event.findOne({
      where: { nama: req.params.nama },
    });
    if (!check) {
      res
        .status(400)
        .send({ errors: { msg: "There is no Event with that event name" } });
    } else {
      const event = await M_Event.findOne({
        where: { nama: req.params.nama },
        include: [
          {
            model: M_Tamu,
            required: true,
            attributes: { exclude: ["id", "event_id"] },
          },
        ],
        attributes: { exclude: ["id"] },
      });
      res.json(event);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Delete Event
router.delete("/data/event/:id", auth, async (req, res) => {
  try {
    const check = await M_Event.findOne({
      where: { id: req.params.id },
    });
    if (!check) {
      res
        .status(400)
        .send({ errors: { msg: "There is no Event with that ID" } });
    } else {
      const tamu = await M_Tamu.destroy({
        where: { id: req.params.id },
      });

      const event = await M_Event.destroy({
        where: { id: req.params.id },
      });
      res.status(200).send("Event Successfully Deleted");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Update Data Event
router.put("/data/event/:nama", auth, async (req, res) => {
  const { nama, description, harga, rules, poster, lokasi, tanggal } = req.body;
  try {
    const check = await M_Event.findOne({
      where: { nama: req.params.nama },
    });
    if (!check) {
      res
        .status(400)
        .send({ errors: { msg: "There is no Event with that event name" } });
    } else {
      const event = await M_Event.update(
        {
          nama,
          description,
          harga,
          rules,
          poster,
          lokasi,
          tanggal,
        },
        { where: { nama: req.params.nama } }
      );
      res.status(200).send("Event Successfully Updated");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
