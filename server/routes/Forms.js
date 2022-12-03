const express = require('express')
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

module.exports = router