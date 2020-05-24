const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = require("../../middleware/auth");
const { M_Administrator, M_Admin_Divisi } = require("../../models/M_SuperUser");
const { M_Anggota, M_Agama, M_Divisi } = require("../../models/M_Anggota");
const M_Dokumen = require("../../models/M_Dokumen");

router.post("/", auth, async (req, res) => {
  const { nama, description, tipe_file, jenis_file, file } = req.body;
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
      const dokumen = await M_Dokumen.create({
        nama,
        description,
        jenis_file,
        tipe_file,
        created_by: admin.nama,
        file,
      });
      delete dokumen.dataValues["id"];
      res.status(200).send(dokumen);
    } else {
      const dokumen = await M_Dokumen.create({
        nama,
        description,
        jenis_file,
        tipe_file,
        created_by: divisi.nama_depan + " " + divisi.nama_belakang,
        file,
      });
      delete dokumen.dataValues["id"];
      res.status(200).send(dokumen);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.put("/:nama_dokumen", auth, async (req, res) => {
  const { nama, description, tipe_file, jenis_file, file } = req.body;
  try {
    const check = await M_Dokumen.findOne({
      where: { nama: req.params.nama_dokumen },
    });
    if (!check) {
      res.status(400).send({
        errors: { msg: "There is no Dokumen with that nama dokumen" },
      });
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
        const dokumen = await M_Dokumen.update({
          nama,
          description,
          jenis_file,
          tipe_file,
          file,
          updated_by: admin.nama,
        });
        res.status(200).send("Dokumen Successfully Updated");
      } else {
        const dokumen = await M_Dokumen.update({
          nama,
          description,
          jenis_file,
          tipe_file,
          file,
          updated_by: divisi.nama_depan + " " + divisi.nama_belakang,
        });
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const check = await M_Dokumen.findOne({
      where: { id: req.params.id },
    });
    if (!check) {
      res
        .status(400)
        .send({ errors: { msg: "There is no Dokumen with that ID" } });
    } else {
      const dokumen = await M_Dokumen.destroy({
        where: { id: req.params.id },
      });
      res.status(200).send("Dokumen Successfully Deleted");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const dokumen = await M_Dokumen.findAll({
      attributes: { exclude: ["id"] },
    });
    res.json(dokumen);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:nama_dokumen", auth, async (req, res) => {
  try {
    const dokumen = await M_Dokumen.findOne({
      where: { nama: req.params.nama_dokumen },
      attributes: { exclude: ["id"] },
    });
    if (!dokumen) {
      res.status(400).send({
        errors: { msg: "There is no Dokumen with that nama dokumen" },
      });
    } else {
      res.json(dokumen);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
