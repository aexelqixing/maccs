// import express and the routers 
const express = require("express");
const router = express.Router();
const { Forms, Comments } = require("../models"); // the table we are importing
const { validateToken } = require("../middlewares/AuthMiddleware"); // authentication from tokens

// get all the comments from a specific form
router.get("/:formId", validateToken, async (req, res) => {
    const formId = req.params.formId; // get the form id
    const form = await Forms.findByPk(formId);
    const comments = await Comments.findAll({ where: { FormId: formId } }); // get all comments associated with this formzz
    if (!req.user) {
        res.json({ error: "User not logged in." });
    } else if (form == null) {
        res.json({error: "This form does not exist"})
    } else if (!req.user.isAdmin && req.user.student !== form.student) { // if the user isn't an admin and also isn't this student, don't show the form
        res.json({ error: "This user does not have access to this form." })
    } else {
        res.json(comments); // otherwise, you can return it
    }
})

// post a comment
router.post("/", validateToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.student;
    const isAdmin = req.user.isAdmin;
    comment.username = username;
    comment.isAdmin = isAdmin;
    await Comments.create(comment);
    res.json(comment);
})

// delete a comment
router.delete("/:commentId", validateToken, async (req, res) => {
    const commentId = req.params.commentId;
    const comment = Comments.findByPk(commentId); // get the form id
    const form = await Forms.findByPk(comment.FormId);
    console.log(req.user);
    if (!req.user) {
        res.json({error: "User not logged in."});
    } else if (form == null || comment == null) {
        res.json({error: "This form does not exist"})
    } else if (!req.user.isAdmin && req.user.student !== form.student)  { // if the user isn't an admin and also isn't this student, don't show the form
        res.json({error: "This user does not have access to this comment."})
    } else {
        Comments.destroy({where: {
            id: commentId,
        }});
        res.json("DELETED SUCCESSFULLY");
    }
    
})

module.exports = router;
