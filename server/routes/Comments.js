const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/:formId", async (req, res) => {
    const formId = req.params.formId;
    const comments = await Comments.findAll( { where: { FormId: formId } });
    res.json(comments);
})

router.post("/", validateToken, async (req, res) => {
    const comment = req.body;
    const username = req.user.student;
    const isAdmin = req.user.isAdmin;
    comment.username = username;
    comment.isAdmin = isAdmin;
    await Comments.create(comment);
    res.json(comment);
})

module.exports = router;