const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");

const {sign} = require('jsonwebtoken')

router.post("/", async (req, res) => {
    const { firstName, lastName, gradYear, student, password, isAdmin } = req.body;

    const user = await Users.findOne({ where: { student: student }});
    if (!user) {
        bcrypt.hash(password, 10).then((hash) => {
            Users.create({
                firstName: firstName,
                lastName: lastName,
                student: student,
                gradYear: gradYear,
                password: hash,
                isAdmin: isAdmin
            })
        })
        res.json("successfully hashed.");
    }
    else res.json("User already exists.");
});

router.post('/login', async (req, res) => {
    const { student, password } = req.body;

    const user = await Users.findOne({ where: { student: student } });

    if (!user) res.json({error: "User doesn't exist. "});

    else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) res.json({error: "Wrong Username Or Password Combination. "});
            else {
                const accessToken = sign({student: user.student, id: user.id, isAdmin: user.isAdmin}, "importantsecret");
                console.log("accessToken" + accessToken);
                res.json(accessToken);
            }
        })
    }
})

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user);
})

module.exports = router;