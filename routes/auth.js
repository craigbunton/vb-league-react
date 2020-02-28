const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

// GET THE CURRENTLY LOGGED IN USER OBJECT to add to authState:
// @route   GET api/auth
// @desc    Get request using userid from req.body.id returns the User Object
//          in the response
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    console.log("Router get / req: ", req.user);

    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// LOGIN ROUTE:
// @route   POST api/auth
// @desc    Takes userName and password as input from req.body, checks the
//          userName exists, and if so, takes the id from the database response
//          then validates the password using bcrypt, builds a json web token
//          and returns the token in the response
// @access  Public
router.post(
  "/",
  [
    check("userName", "Please include a user name").exists(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userName, password } = req.body;

    try {
      let user = await User.findOne({ userName });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const payload = {
        userName: {
          id: user.id
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
