const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const { M_Administrator, M_Admin_Divisi } = require("../../models/M_SuperUser");

const { M_Agama, M_Anggota, M_Divisi } = require("../../models/M_Anggota");

const { Op } = require("sequelize");

//Create Data Anggota By Admin
router.post("/", auth, async (req, res) => {
  const {
    nama_depan,
    nama_belakang,
    tempat,
    tgl_lahir,
    agama_id,
    nim,
    jabatan,
    angkatan,
    foto,
    divisi_id,
    whatsapp,
    email,
    facebook,
    twitter,
    instagram,
  } = req.body;
  try {
    const check = await M_Anggota.findOne({
      where: { nim },
    });

    if (check) {
      res.status(400).send({ errors: { msg: "NIM is already exists" } });
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
        const anggota = await M_Anggota.create({
          nama_depan,
          nama_belakang,
          tempat,
          tgl_lahir,
          agama_id,
          nim,
          jabatan,
          angkatan,
          foto,
          nim,
          divisi_id,
          jabatan,
          angkatan,
          foto,
          created_by: admin.nama,
          whatsapp,
          email,
          facebook,
          twitter,
          instagram,
        });
        delete anggota.dataValues["id"];
        delete anggota.dataValues[("agama_id", "divisi_id")];
        res.status(200).send(anggota);
      } else {
        const anggota = await M_Anggota.create({
          nama_depan,
          nama_belakang,
          tempat,
          tgl_lahir,
          agama_id,
          nim,
          jabatan,
          angkatan,
          foto,
          nim,
          divisi_id,
          jabatan,
          angkatan,
          foto,
          created_by:
            divisi.anggotum.nama_depan + " " + divisi.anggotum.nama_belakang,
          whatsapp,
          email,
          facebook,
          twitter,
          instagram,
        });
        delete anggota.dataValues["id"];
        delete anggota.dataValues[("agama_id", "divisi_id")];
        res.status(200).send(anggota);
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// GET All Data Anggota
router.get("/", async (req, res) => {
  try {
    const anggota = await M_Anggota.findAll({
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
      attributes: { exclude: ["id", "agama_id", "divisi_id"] },
    });
    res.json(anggota);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// GET Single Data Anggota
router.get("/:nim", async (req, res) => {
  try {
    const check = await M_Anggota.findOne({
      where: { nim: req.params.nim },
    });
    if (!check) {
      res
        .status(400)
        .send({ errors: { msg: "There is no anggota with that nim" } });
    } else {
      const anggota = await M_Anggota.findOne({
        where: { nim: req.params.nim },
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
        attributes: { exclude: ["id", "agama_id", "divisi_id"] },
      });
      res.json(anggota);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Delete Single Data
router.delete("/:nim", auth, async (req, res) => {
  try {
    const check = await M_Anggota.findOne({
      where: { nim: req.params.nim },
    });
    if (!check) {
      res.status(400).send({
        errors: { msg: "There is no Anggota with that nim" },
      });
    } else {
      const anggota = await M_Anggota.destroy({
        where: { nim: req.params.nim },
      });
      res.status(200).send("Anggota Successfully Deleted");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Update Data Anggota
router.put("/:nim", auth, async (req, res) => {
  const {
    nim,
    jabatan,
    angkatan,
    foto,
    firstName,
    lastName,
    tgl_lahir,
    agama_id,
    alamat,
    whatsapp,
    email,
    facebook,
    twitter,
    instagram,
  } = req.body;
  try {
    const check = await M_Anggota.findOne({
      where: { nim: req.params.nim },
    });
    if (!check) {
      res.status(400).send({
        errors: { msg: "There is no Anggota with that NIM" },
      });
    } else {
      const isAvailable = await M_Anggota.findOne({
        where: {
          [Op.and]: [
            {
              nim,
            },
            { nim: { [Op.not]: check.nim } },
          ],
        },
      });
      if (isAvailable) {
        res.status(400).json({
          errors: [
            {
              msg: "NIM already exists",
            },
          ],
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
          const anggota = await M_Anggota.update(
            {
              firstName,
              lastName,
              tempat,
              tgl_lahir,
              agama_id,
              nim,
              jabatan,
              angkatan,
              foto,
              whatsapp,
              email,
              facebook,
              twitter,
              instagram,
              updated_by: admin.nama,
            },
            {
              where: { nim: req.params.nim },
            }
          );
          res.status(200).send("Anggota Successfully Updated");
        } else {
          const anggota = await M_Anggota.update(
            {
              firstName,
              lastName,
              tempat,
              tgl_lahir,
              agama_id,
              nim,
              jabatan,
              angkatan,
              foto,
              whatsapp,
              email,
              facebook,
              twitter,
              instagram,
              updated_by: divisi.nama_depan + " " + divisi.nama_belakang,
            },
            {
              where: { nim: req.params.nim },
            }
          );
          res.status(200).send("Anggota Successfully Updated");
        }
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
