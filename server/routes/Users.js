// import express and the routers
const express = require("express");
const router = express.Router();
const { Users } = require("../models"); // the table we are importing
const bcrypt = require("bcrypt"); // hash functions
const { validateToken } = require("../middlewares/AuthMiddleware"); // authentication from tokens

const { sign } = require("jsonwebtoken");

// registering a user
router.post("/", async (req, res) => {
  // get all attributes from the request by destructuring the body of the request
  const { firstName, lastName, gradYear, student, password, isAdmin } =
    req.body;

  // find if the user exists already
  const user = await Users.findOne({ where: { student: student } });
  // if it doesn't exist, create a user (but hash the password first)
  if (!user) {
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        firstName: firstName,
        lastName: lastName,
        student: student,
        gradYear: gradYear,
        password: hash,
        isAdmin: isAdmin,
      });
    });
    res.json("successfully hashed.");
  }
  // if the user does exist, then return an error
  else res.json({ error: "User already exists." });
});

// loggin in a user
router.post("/login", async (req, res) => {
  // get the username and password from the request
  const { student, password } = req.body;

  // find the user from the table
  const user = await Users.findOne({ where: { student: student } });

  // if the user doesn't exist, return an error
  if (!user) res.json({ error: "User doesn't exist. " });
  else {
    // compare the password that was entered with the actual password
    bcrypt.compare(password, user.password).then((match) => {
      // if it doesn't match, then it's the wrong combination
      if (!match)
        res.json({ error: "Wrong Username Or Password Combination. " });
      else {
        // get the username, id, and if they're an admin
        const accessToken = sign(
          { student: user.student, id: user.id, isAdmin: user.isAdmin },
          "importantsecret"
        );
        // console.log("accessToken" + accessToken);
        // grab the rest of the information too
        res.json({
          token: accessToken,
          firstName: user.firstName,
          lastName: user.lastName,
          gradYear: user.gradYear,
          student: user.isAdmin,
          id: user.id,
        });
      }
    });
  }
});

// check if a user is logged in (otherwise they cannot access pages)
router.get("/auth", validateToken, async (req, res) => {
  // get the student request access from the student
  const student = req.user.student;

  // find if the user exists
  const user = await Users.findOne({ where: { student: student } });

  // if they don't return an error
  if (!user) res.json({ error: "You are not logged in. " });
  // otherwise, grab all the information
  else {
    req.user.isAdmin = user.isAdmin;
    req.user.username = user.student;
    req.user.firstName = user.firstName;
    req.user.lastName = user.lastName;
    req.user.gradYear = user.gradYear;
    res.json(req.user);
  }
});

router.get("/basicInfo/:id", async (req, res) => {
  const id = req.params.id;

  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  res.json(basicInfo);
});

module.exports = router;
