// import express and the routers 
const express = require('express')
const router = express.Router()
const { validateToken } = require("../middlewares/AuthMiddleware"); // authentication from tokens

const { Forms } = require('../models') // the table we are importing

// grabbing all of the forms
router.get("/", validateToken, async (req, res) => {
    // if there isn't a user, then don't show any forms
    if (!req.user) {
        res.json({error: "User not logged in."});
    } else {
        // if the user is an admin, show all forms in descending order of updated
        if (req.user.isAdmin) {
            const listOfForms = await Forms.findAll({order: [['updatedAt', 'DESC']]})
            res.json(listOfForms)
        } 
        // otherwise, show only forms for the student in descending order of updated
        else {
            const listOfForms = await Forms.findAll( { where: { student: req.user.student }, order: [['updatedAt', 'DESC']] })
            res.json(listOfForms)
        }
    }
})

// getting information of a specific form by id
router.get("/byId/:id", validateToken, async (req, res) => {
    // if the user isn't logged in, then return error
    if (!req.user) {
        res.json({error: "User not logged in."});
    } 
    // otherwise, grab all the informations
    else {
        // console.log(req.user.student);
        const id = req.params.id; // get the id
        const form = await Forms.findByPk(id); // get the form associated with this id
        if (!req.user.isAdmin && req.user.student !== form.student) { // if the user isn't an admin and also isn't this student, don't show the form
            res.json({error: "Not this user."})
        } else {
            res.json(form); // otherwise, you can return it
        }
        // console.log(form.student);
        // res.json(form);
    }
})

// getting information of a specific form by id
router.get("/byUserId/:id", validateToken, async (req, res) => {
    // if the user isn't logged in, then return error
    if (!req.user) {
        res.json({error: "User not logged in."});
    } 
    // otherwise, grab all the informations
    else {
        // console.log(req.user.student);
        const id = req.params.id; // get the id
        const listOfForms = await Forms.findAll({ where: {UserId: id}})
        res.json(listOfForms);
    }
})

// creating a form
router.post("/", validateToken, async (req, res) => {
    const form = req.body // get the form data from the body
    const username = req.user.student; // get the username
    form.student = username;

    form.UserId = req.user.id;
    await Forms.create(form); // create the form
    res.json(form);
})

// updating a form
router.put("/byId/:id", async (req, res) => {
    const id = req.params.id // get the form id
    const [updated] = await Forms.update(req.body, {where: {id: id }}); // update the exact form

    // if it has been updated
    if (updated) {
        const updatedForm = await Forms.findByPk(id); // great! we can return the form back
        res.json(updatedForm)
    } else {
        res.json(updated); // just return the information
    }
})

// delete a form
router.delete("/:formId", validateToken, async (req, res) => {
    const formId = req.params.formId;

    Forms.destroy({where: {
        id: formId,
    }});

    res.json("DELETED SUCCESSFULLY");
})

module.exports = router