const express = require('express')
const db = require('../models')
const router = express.Router()

const { Forms } = require('../models')

router.get("/", async (req, res) => {
    const listOfForms = await Forms.findAll()
    res.json(listOfForms)
})

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const form = await Forms.findByPk(id);
    res.json(form);
})

router.post("/", async (req, res) => {
    const form = req.body

    await Forms.create(form);
    res.json(form);
})

router.put("/byId/:id", async (req, res) => {
    const id = req.params.id
    const [updated] = await Forms.update(req.body, {where: {id: id }});

    if (updated) {
        const updatedForm = await Forms.findByPk(id);
        res.json(updatedForm)
    }
    res.json(updated);
})

module.exports = router