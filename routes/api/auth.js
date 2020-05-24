const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = require("../../middleware/auth");
const { M_Administrator, M_Admin_Divisi } = require("../../models/M_SuperUser");
const { M_Anggota, M_Agama, M_Divisi } = require("../../models/M_Anggota");

// Login Admin
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  // Check if Admin exists
  try {
    const admin = await M_Administrator.findOne({ where: { username } });
    const divisi = await M_Admin_Divisi.findOne({ where: { username } });
    if (!admin && !divisi) {
      res.status(400).json({
        errors: [
          {
            msg: "Invalid Username or Password",
          },
        ],
      });
    } else {
      if (admin) {
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
          res.status(400).json({
            errors: [
              {
                msg: "Invalid Username or Password",
              },
            ],
          });
        }
        const payload = {
          user: {
            username: admin.username,
          },
        };

        jwt.sign(
          payload,
          config.get("jwtToken"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      } else {
        const isMatch = await bcrypt.compare(password, divisi.password);
        if (!isMatch) {
          res.status(400).json({
            errors: [
              {
                msg: "Invalid Username or Password",
              },
            ],
          });
        }
        const payload = {
          user: {
            username: divisi.username,
          },
        };

        jwt.sign(
          payload,
          config.get("jwtToken"),
          { expiresIn: 360000 },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Change Username
router.put("/:username", auth, async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await M_Administrator.findOne({
      where: { username: req.params.username },
    });
    const divisi = await M_Admin_Divisi.findOne({
      where: { username: req.params.username },
    });
    if (!admin && !divisi) {
      res.status(404).json({
        errors: [
          {
            msg: "There is no account with that username",
          },
        ],
      });
    } else {
      if (admin) {
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
          res.status(400).json({
            errors: [
              {
                msg: "Failed to change username, password incorrect",
              },
            ],
          });
        } else {
          const updateAdmin = await M_Administrator.update(
            {
              username,
            },
            { where: { username: req.params.username } }
          );
          const payload = {
            user: {
              username,
            },
          };

          jwt.sign(
            payload,
            config.get("jwtToken"),
            { expiresIn: 360000 },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        }
      } else {
        const isMatch = await bcrypt.compare(password, divisi.password);
        if (!isMatch) {
          res.status(400).json({
            errors: [
              {
                msg: "Failed to change username, password incorrect",
              },
            ],
          });
        } else {
          const updateAdmin = await M_Admin_Divisi.update(
            {
              username,
            },
            { where: { username: req.params.username } }
          );
          const payload = {
            user: {
              username,
            },
          };

          jwt.sign(
            payload,
            config.get("jwtToken"),
            { expiresIn: 360000 },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        }
      }
    }
  } catch (error) {}
});

// Change Password
router.put("/password/:username", auth, async (req, res) => {
  let { password, newPassword } = req.body;

  // Check if Admin exists
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
            msg: "There is no account with that username",
          },
        ],
      });
    } else {
      if (admin) {
        const isMatch = await bcrypt.compare(password, admin.password);
        const isSame = await bcrypt.compare(newPassword, admin.password);
        if (!isMatch) {
          res.status(400).json({
            errors: [
              {
                msg: "Incorrect old password",
              },
            ],
          });
        } else if (isSame) {
          res.status(400).json({
            errors: [
              {
                msg: "The old password and new password are the same",
              },
            ],
          });
        } else {
          const salt = await bcrypt.genSalt(12);
          newPassword = await bcrypt.hash(newPassword, salt);
          const updateAdmin = await M_Administrator.update(
            {
              password: newPassword,
            },
            { where: { username: req.params.username } }
          );
          res.status(200).send("Your password successfully changed");
        }
      } else {
        const isMatch = await bcrypt.compare(password, divisi.password);
        const isSame = await bcrypt.compare(newPassword, divisi.password);
        if (!isMatch) {
          res.status(400).json({
            errors: [
              {
                msg: "Incorrect old password",
              },
            ],
          });
        } else if (isSame) {
          res.status(400).json({
            errors: [
              {
                msg: "The old password and new password are the same",
              },
            ],
          });
        } else {
          const salt = await bcrypt.genSalt(12);
          newPassword = await bcrypt.hash(newPassword, salt);
          const updateDivisi = await M_Admin_Divisi.update(
            {
              password: newPassword,
            },
            { where: { username: req.params.username } }
          );
          res.status(200).send("Your password successfully changed");
        }
      }
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get User Data By Token
router.get("/", auth, async (req, res) => {
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
      res.json(admin);
    } else {
      res.json(divisi);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
    console.log(req.user);
  }
});

module.exports = router;
