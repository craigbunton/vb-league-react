const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Player = require("../models/Player");

// @route   POST api/players
// @desc    Register a player
// @access  Public
router.post(
  "/",
  [
    check("playerName", "Please include a player name")
      .not()
      .isEmpty(),
    check(
      "password",
      "Please enter a password of minimum 6 characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { playerName, password } = req.body;

    try {
      let findPlayer = await Player.findOne({ playerName });

      if (findPlayer) {
        return res
          .status(400)
          .json({ msg: "A player with this name already exists" });
      }

      let player = new Player({
        playerName,
        password
      });

      const salt = await bcrypt.genSalt(10);

      player.password = await bcrypt.hash(password, salt);

      await player.save();

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
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
