const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const auth = require("../../middleware/auth");
const { M_Administrator } = require("../../models/M_SuperUser");

// Login Admin
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  // Check if Admin exists
  try {
    const user = await M_Administrator.findOne({ where: { username } });

    if (!user) {
      res.status(400).json({
        errors: [
          {
            msg: "Invalid Username or Password",
          },
        ],
      });
    }

    // Check if password is the same
    const isMatch = await bcrypt.compare(password, user.password);

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
        id: user.id,
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
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get User Data By Token
router.get("/", auth, async (req, res) => {
  try {
    const user = await M_Administrator.findByPk(req.user.id);
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
