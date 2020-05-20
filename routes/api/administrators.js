const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = require("../../middleware/auth");
const { M_Administrator, M_Admin_Divisi } = require("../../models/M_SuperUser");

const {
  M_Agama,
  M_Anggota,
  M_Sosmed,
  M_Divisi,
} = require("../../models/M_Anggota");

const {
  M_Event,
  M_Pengunjung,
  M_Tiket,
  M_Tamu,
} = require("../../models/M_Event");

const M_Dokumen = require("../../models/M_Dokumen");

const { Op } = require("sequelize");

// ========================= USER SECTION ================================ //

// Create All Users
const create = (params, model) => {
  router.post(params, auth, async (req, res) => {
    let { username, password, nama } = req.body;
    try {
      // See if user exists
      let user = await model.findOne({ where: { username } });

      if (user) {
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

        user = await model.create({
          username,
          password,
          nama,
        });

        delete user.dataValues["id"];
        res.status(200).send(user);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
};
// Create All Users
const createPJ = (params, modelAdmin, model) => {
  router.post(params, auth, async (req, res) => {
    let { username, password, anggota_id } = req.body;
    try {
      // See if user exists
      let user = await model.findOne({ where: { username } });

      if (user) {
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

        admin = await modelAdmin.findByPk(req.user.id);

        user = await model.create({
          username,
          password,
          anggota_id,
          created_by: admin.nama,
        });

        delete user.dataValues["id"];
        res.status(200).send(user);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
};

// Create User Admin
create("/", M_Administrator);
// Create User PJ Event
createPJ("/test", M_Administrator, M_Admin_Divisi);

// Get All Users
const get = (params, model) => {
  router.get(params, auth, async (req, res) => {
    try {
      const user = await model.findAll({
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
};

//Get All User Admin
get("/", M_Administrator);

// Get All User PJ
get("/test", M_Admin_Divisi);

// // Get All User PJ Anggota
// get("/pjAnggota", M_pjAnggota);
// // Get All User PJ Document
// get("/pjDokumen", M_pjDokumen);

// Get Single Users
const getOne = (params, model) => {
  router.get(params, auth, async (req, res) => {
    try {
      const user = await model.findOne({
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
};

// Get Single User Admin
getOne("/:username", M_Administrator);
// // Get Single User PJ Event
// getOne("/pjEvent/:username", M_pjEvent);
// // Get Single User PJ Anggota
// getOne("/pjAnggota/:username", M_pjAnggota);
// // Get Single User PJ Document
// getOne("/pjDokumen/:username", M_pjDokumen);

const update = (params, model) => {
  router.put(params, auth, async (req, res) => {
    let { username, password, nama } = req.body;
    try {
      const isExists = await model.findOne({
        where: { username: req.params.username },
      });

      if (!isExists) {
        res.status(400).json({
          errors: [
            {
              msg: "User doesn't exists",
            },
          ],
        });
      } else {
        const isAvailable = await model.findOne({
          where: {
            [Op.and]: [
              {
                username,
              },
              { username: { [Op.not]: isExists.username } },
            ],
          },
        });
        if (isAvailable) {
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
          const user = await model.update(
            {
              username,
              password,
              nama,
            },
            { where: { username: req.params.username } }
          );
          console.log(user);
          res.status(200).send(user);
        }
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  });
};

const updatePJ = (params, modelUpdate, model) => {
  router.put(params, auth, async (req, res) => {
    let { username, password, nama } = req.body;
    try {
      const isExists = await model.findOne({
        where: { id: req.params.id },
      });

      if (!isExists) {
        res.status(400).json({
          errors: [
            {
              msg: "User doesn't exists",
            },
          ],
        });
      } else {
        const isAvailable = await model.findOne({
          where: {
            [Op.and]: [
              {
                username,
              },
              { username: { [Op.not]: isExists.username } },
            ],
          },
        });
        if (isAvailable) {
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
          const updatedBy = await modelUpdate.findByPk(req.user.id);
          const user = await model.update(
            {
              username,
              password,
              nama,
              updated_by: updatedBy.nama,
            },
            { where: { username: req.params.username } }
          );
          res.status(200).send("Sucessfully updated");
        }
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  });
};

// Update User Admin
update("/:username", M_Administrator);
// // Update User PJ Event
// updatePJ("/pjEvent/:username", M_Administrator, M_pjEvent);
// // Update User PJ Anggota
// updatePJ("/pjAnggota/:username", M_Administrator, M_pjAnggota);
// // Update User PJ Dokumen
// updatePJ("/pjDokumen/:username", M_Administrator, M_pjDokumen);

// Delete Data User
const Delete = (params, model) => {
  router.delete(params, auth, async (req, res) => {
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
};

// Delete User Admin
Delete("/:id", M_Administrator);
// // Delete User PJ Event
// Delete("/pjEvent/:id", M_pjEvent);
// // Delete User PJ Anggota
// Delete("/pjAnggota/:id", M_pjAnggota);
// // Delete User PJ Dokumen
// Delete("/pjDokumen/:id", M_pjDokumen);

// ========================= CLOSED USER  =================================== //

// ========================= ANGGOTA SECTION ================================ //

//Create Data Anggota By Admin
router.post("/data/anggota", auth, async (req, res) => {
  const {
    nama_depan,
    nama_belakang,
    tempat,
    tgl_lahir,
    agama_id,
    alamat,
    pekerjaan,
    nim,
    jabatan,
    angkatan,
    foto,
    email,
    divisi_id,
    instagram,
    twitter,
    whatsapp,
    facebook,
  } = req.body;
  try {
    const check = await M_Anggota.findOne({
      where: { nim },
    });

    if (check) {
      res.status(400).send({ errors: { msg: "NIM is already exists" } });
    } else {
      const admin = await M_Administrator.findByPk(req.user.id);

      const anggota = await M_Anggota.create({
        nama_depan,
        nama_belakang,
        tempat,
        tgl_lahir,
        agama_id,
        alamat,
        pekerjaan,
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
      });

      const anggotaId = await M_Anggota.findOne({
        where: { nim },
      });

      const sosmed = await M_Sosmed.create({
        email,
        instagram,
        twitter,
        whatsapp,
        facebook,
        anggota_id: anggotaId.id,
      });
      delete anggota.dataValues["id"];
      delete anggota.dataValues["agama_id"];
      delete sosmed.dataValues[("id", "anggota_id")];
      const data = { ...anggota.dataValues, ...sosmed.dataValues };
      res.status(200).send(data);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// GET All Data Anggota
router.get("/data/anggota", auth, async (req, res) => {
  try {
    const anggota = await M_Anggota.findAll({
      include: [
        {
          model: M_Sosmed,
          required: true,
          attributes: { exclude: ["id", "anggota_id"] },
        },
        {
          model: M_Agama,
          required: true,
          attributes: { exclude: ["id"] },
        },
      ],
      attributes: { exclude: ["id", "agama_id"] },
    });
    res.json(anggota);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// GET Single Data Anggota
router.get("/data/anggota/:username", auth, async (req, res) => {
  try {
    const check = await M_Anggota.findOne({
      where: { username: req.params.username },
    });
    if (!check) {
      res
        .status(400)
        .send({ errors: { msg: "There is no anggota with that username" } });
    } else {
      const anggota = await M_Anggota.findOne({
        where: { username: req.params.username },
        include: [
          {
            model: M_Sosmed,
            required: true,
            attributes: { exclude: ["id", "anggota_id"] },
          },
          {
            model: M_Agama,
            required: true,
            attributes: { exclude: ["id"] },
          },
        ],
        attributes: { exclude: ["id", "agama_id"] },
      });
      res.json(anggota);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Delete Single Data
router.delete("/data/anggota/:id", auth, async (req, res) => {
  try {
    const check = await M_Anggota.findOne({
      where: { id: req.params.id },
    });
    if (!check) {
      res.status(400).send({
        errors: { msg: "There is no Anggota with that ID" },
      });
    } else {
      const sosmedId = await M_Sosmed.findOne({
        where: { id: check.id },
      });
      const sosmed = await M_Sosmed.destroy({
        where: { id: sosmedId.id },
      });
      const anggota = await M_Anggota.destroy({
        where: { id: req.params.id },
      });
      res.status(200).send("Anggota Successfully Deleted");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Update Data Anggota
router.put("/data/anggota/:nim", auth, async (req, res) => {
  const {
    nim,
    jabatan,
    angkatan,
    foto,
    firstName,
    lastName,
    tempat,
    pekerjaan,
    tgl_lahir,
    agama_id,
    alamat,
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
      const adminId = await M_Administrator.findByPk(req.user.id);
      const anggota = await M_Anggota.update(
        {
          firstName,
          lastName,
          tempat,
          tgl_lahir,
          agama_id,
          alamat,
          pekerjaan,
          nim,
          jabatan,
          angkatan,
          foto,
          updated_by: adminId.nama,
        },
        {
          where: { nim: req.params.nim },
        }
      );
      res.status(200).send("Anggota Successfully Updated");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Update Data Sosmed
router.put("/data/sosmed/:nim", auth, async (req, res) => {
  const { email, facebook, twitter, instagram, whatsapp } = req.body;
  try {
    const check = await M_Anggota.findOne({
      where: { nim: req.params.nim },
    });
    if (!check) {
      res.status(400).send({
        errors: { msg: "There is no anggota with that NIM" },
      });
    } else {
      const sosmed = await M_Sosmed.update(
        {
          email,
          facebook,
          twitter,
          instagram,
          whatsapp,
        },
        {
          where: { anggota_id: check.anggota_id },
        }
      );
      res.status(200).send("Sosmed Successfully Updated");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// ========================= CLOSED ANGGOTA  =================================== //

// ========================= EVENT SECTION  ==================================== //

router.post("/data/event", auth, async (req, res) => {
  const {
    nama,
    description,
    harga,
    rules,
    poster,
    lokasi,
    tanggal,
    nama_tamu_1,
    nama_tamu_2,
    nama_tamu_3,
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
      created_by: adminId.id,
    });

    const eventId = await M_Event.findOne({
      order: [["createdAt", "DESC"]],
    });

    const tamu = await M_Tamu.create({
      nama_tamu_1,
      nama_tamu_2,
      nama_tamu_3,
      event_id: eventId.id,
    });
    res.status(200).send("Event Successfully Created");
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

// Update Data Tamu
// Update Data Event
router.put("/data/tamu/:nama", auth, async (req, res) => {
  const { nama_tamu_1, nama_tamu_2, nama_tamu_3 } = req.body;
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
          nama_tamu_1,
          nama_tamu_2,
          nama_tamu_3,
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

// Post Data Pengunjung
router.post("/data/pengunjung", auth, async (req, res) => {
  const { nama_depan, nama_belakang, email, no_telp } = req.body;
  try {
    const event_id = await M_Event.findOne();
    const pengunjung = await M_Pengunjung.create({
      nama_depan,
      nama_belakang,
      email,
      no_telp,
      event_id: event_id.id,
    });
    res.status(200).send("Pengunjung Successfully Created");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

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

// ========================= CLOSED EVENT  ==================================== //

router.post("/data/dokumen", auth, async (req, res) => {
  const { nama, description, tipe_file, jenis_file, file } = req.body;
  try {
    const admin = await M_Administrator.findByPk(req.user.id);
    const dokumen = await M_Dokumen.create({
      nama,
      description,
      jenis_file,
      tipe_file,
      created_by: admin.id,
      file,
    });
    res.status(200).send("Dokumen Successfully Created");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.put("/data/dokumen/:nama_dokumen", auth, async (req, res) => {
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
      const dokumen = await M_Dokumen.update({
        nama,
        description,
        jenis_file,
        tipe_file,
        file,
      });
      res.status(200).send("Dokumen Successfully Updated");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.delete("/data/dokumen/:id", auth, async (req, res) => {
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

router.get("/data/dokumen", auth, async (req, res) => {
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

router.get("/data/dokumen/:nama_dokumen", auth, async (req, res) => {
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
