// import express and the routers 
const express = require("express");
const router = express.Router();
const { Comments } = require("../models"); // the table we are importing
const { validateToken } = require("../middlewares/AuthMiddleware"); // authentication from tokens

// get all the comments from a specific form
router.get("/:formId", async (req, res) => {
    const formId = req.params.formId; // get the form id
    const comments = await Comments.findAll( { where: { FormId: formId } }); // get all comments associated with this form
    res.json(comments);
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

    Comments.destroy({where: {
        id: commentId,
    }});

    res.json("DELETED SUCCESSFULLY");
})

module.exports = router;