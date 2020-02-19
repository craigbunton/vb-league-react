const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const Player = require("../models/Player");

// @route   GET api/auth
// @desc    Get logged in player
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const player = await Player.findById(req.body.id).select("-password");
    res.json(player);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// @route   POST api/auth
// @desc    Auth player & get token
// @access  Public
router.post(
  "/",
  [
    check("playerName", "Please include a player name").exists(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { playerName, password } = req.body;

    try {
      let player = await Player.findOne({ playerName });
      if (!player) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      const isMatch = await bcrypt.compare(password, player.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const payload = {
        player: {
          id: player.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
