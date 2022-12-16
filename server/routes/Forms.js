const express = require('express')
const router = express.Router()
const { validateToken } = require("../middlewares/AuthMiddleware");

const { Forms } = require('../models')

router.get("/", validateToken, async (req, res) => {
    if (!req.user) {
        res.json({error: "User not logged in."});
    } else {
        if (req.user.isAdmin) {
            const listOfForms = await Forms.findAll()
            res.json(listOfForms)
        } else {
            const listOfForms = await Forms.findAll( { where: { student: req.user.student } })
            res.json(listOfForms)
        }
    }
})

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const form = await Forms.findByPk(id);
    res.json(form);
})

router.post("/", validateToken, async (req, res) => {
    const form = req.body
    const username = req.user.student;
    form.student = username;
    await Forms.create(form);
    res.json(form);
})

router.put("/byId/:id", async (req, res) => {
    const id = req.params.id
    const [updated] = await Forms.update(req.body, {where: {id: id }});

    if (updated) {
        const updatedForm = await Forms.findByPk(id);
        res.json(updatedForm)
    } else {
        res.json(updated);
    }
})

module.exports = router