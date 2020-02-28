const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const auth = require("../middleware/auth");

const { check, validationResult } = require("express-validator");

const User = require("../models/User");

// RETURN A LIST OF ACTIVE USERS (ARRAY OF USER OBJECTS)
// @route   GET api/users
// @desc    Return an array of user objects where isActive=true
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// REGISTER NEW USER route:
// @route   POST api/users with userName & password in req.body
// @desc    Validates, then Adds a new User to the database,
//          then builds and returns a json web token in the response
// @access  Public
router.post(
  "/",
  [
    check("userName", "Please include a user name")
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
    const { userName, password, isManager } = req.body;

    try {
      let user = await User.findOne({ userName });

      if (user) {
        return res
          .status(400)
          .json({ msg: "A user with this name already exists" });
      }

      user = new User({
        userName,
        password,
        isManager
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
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
      res.status(500).send("Server error");
    }
  }
);

router.put("/:id", auth, async (req, res) => {
  console.log("from the url passed to the API - req.params: ", req.params);
  console.log(
    "decoded user id from localstorage webtoken req.user: ",
    req.user
  );

  const {
    userName,
    firstName,
    lastName,
    email,
    phone,
    isActive,
    isManager,
    password
  } = req.body;

  // Build a user update object with user-updatable fields:
  const userFields = {};
  if (userName) userFields.userName = userName;
  if (firstName) userFields.firstName = firstName;
  if (lastName) userFields.lastName = lastName;
  if (email) userFields.email = email;
  if (phone) userFields.phone = phone;
  if (password) userFields.password = password;

  try {
    // create 'user' object from the req URL params
    let user = await User.findById(req.params.id);

    if (!user) return res.status(400).json({ msg: "User not found" });

    // If the id from the webtoken is not a manager, check that they are
    // only updating their own user record...
    if (!req.user.isManager) {
      if (user.id.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not authorised" });
      }
    }

    //############### USERNAME CHECKS ##############
    // Check for username duplicates.
    // First pull out any matching userName...
    if (userName) {
      let userExists = await User.findOne({ userName });

      // ...then check if there is a returned user with that id,
      // but not if the username matches itself
      if (userExists && userExists.id !== user.id) {
        return res
          .status(400)
          .json({ msg: "Another user with this name already exists" });
      }
    }

    //############### ISACTIVE ISMANAGER CHECKS ##############
    // Only managers can update the isActive/isManager status of a user
    if (req.user.isManager) {
      if (isActive) {
        userFields.isActive = isActive;
      }
      if (isManager) {
        userFields.isManager = isManager;
      }
    }

    //############### PASSWORD CHECKS ##############
    // Check password length then salt and bcrypt it
    if (password) {
    }

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/users
// @desc    Delete a user from the database
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: "User not found" });

    //Make sure contact owns user
    if (user.id.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorised" });
    }

    await User.findByIdAndRemove(req.params.id);

    res.json({ msg: "User Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
