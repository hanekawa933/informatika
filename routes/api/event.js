const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = require("../../middleware/auth");
const { M_Administrator, M_Admin_Divisi } = require("../../models/M_SuperUser");

const { M_Anggota, M_Agama, M_Divisi } = require("../../models/M_Anggota");

const {
  M_Event,
  M_Pengunjung,
  M_Tiket,
  M_Tamu,
} = require("../../models/M_Event");

router.post("/", auth, async (req, res) => {
  const {
    nama,
    description,
    harga,
    rules,
    poster,
    lokasi,
    tanggal,
    jam_mulai,
    jam_berakhir,
    nama_tamu,
  } = req.body;
  try {
    const admin = await M_Administrator.findOne({
      where: { username: req.user.username },
      attributes: { exclude: ["id"] },
    });

    const divisi = await M_Admin_Divisi.findOne({
      where: { username: req.user.username },
      attributes: { exclude: ["id", "anggota_id"] },
      include: [
        {
          model: M_Anggota,
          required: true,
          attributes: { exclude: ["id", "agama_id", "divisi_id"] },
          include: [
            {
              model: M_Agama,
              required: true,
              attributes: { exclude: ["id"] },
            },
            {
              model: M_Divisi,
              required: true,
              attributes: { exclude: ["id"] },
            },
          ],
        },
      ],
    });

    if (admin) {
      const event = await M_Event.create({
        nama,
        description,
        harga,
        rules,
        poster,
        lokasi,
        tanggal,
        jam_mulai,
        jam_berakhir,
        created_by: admin.nama,
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
    } else {
      const event = await M_Event.create({
        nama,
        description,
        harga,
        rules,
        poster,
        lokasi,
        tanggal,
        jam_mulai,
        jam_berakhir,
        created_by: divisi.nama_depan + " " + divisi.nama_belakang,
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
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get All Event
router.get("/", async (req, res) => {
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
router.get("/:nama", async (req, res) => {
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
router.delete("/:id", auth, async (req, res) => {
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
router.put("/:nama", auth, async (req, res) => {
  const {
    nama,
    description,
    harga,
    rules,
    poster,
    lokasi,
    tanggal,
    jam_mulai,
    jam_berakhir,
  } = req.body;
  try {
    const check = await M_Event.findOne({
      where: { nama: req.params.nama },
    });
    if (!check) {
      res
        .status(400)
        .send({ errors: { msg: "There is no Event with that event name" } });
    } else {
      const admin = await M_Administrator.findOne({
        where: { username: req.user.username },
        attributes: { exclude: ["id"] },
      });

      const divisi = await M_Admin_Divisi.findOne({
        where: { username: req.user.username },
        attributes: { exclude: ["id", "anggota_id"] },
        include: [
          {
            model: M_Anggota,
            required: true,
            attributes: { exclude: ["id", "agama_id", "divisi_id"] },
            include: [
              {
                model: M_Agama,
                required: true,
                attributes: { exclude: ["id"] },
              },
              {
                model: M_Divisi,
                required: true,
                attributes: { exclude: ["id"] },
              },
            ],
          },
        ],
      });

      if (admin) {
        const event = await M_Event.update(
          {
            nama,
            description,
            harga,
            rules,
            poster,
            lokasi,
            tanggal,
            jam_mulai,
            jam_berakhir,
            updated_by: admin.nama,
          },
          { where: { nama: req.params.nama } }
        );
        res.status(200).send("Event Successfully Updated");
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
            jam_mulai,
            jam_berakhir,
            updated_by: divisi.nama_depan + " " + divisi.nama_belakang,
          },
          { where: { nama: req.params.nama } }
        );
        res.status(200).send("Event Successfully Updated");
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
