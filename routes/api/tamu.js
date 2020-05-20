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

// Update Data Tamu
router.put("/data/tamu/:nama", auth, async (req, res) => {
  const { nama_tamu } = req.body;
  try {
    const check = await M_Event.findOne({
      where: { nama: req.params.nama },
    });
    if (!check) {
      res
        .status(400)
        .send({ errors: { msg: "There is no Event with that event name" } });
    } else {
      const eventId = await M_Event.findOne({
        where: { nama: req.params.nama },
      });
      const tamu = await M_Tamu.update(
        {
          nama_tamu,
          event_id: eventId.id,
        },
        { where: { event_id: eventId.event_id } }
      );
      res.status(200).send("Tamu Successfully Updated");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
