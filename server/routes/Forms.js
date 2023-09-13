// import express and the routers 
const express = require('express')
const nodemailer = require('nodemailer');
const router = express.Router()
const { validateToken } = require("../middlewares/AuthMiddleware"); // authentication from tokens
const { email, password } = require('../config.js');

const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../client/src/assets/images'));
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail'
    auth: {
        user: email,
        pass: password,
    }
});

const { Forms, Users } = require('../models') // the table we are importing

// grabbing all of the forms
router.get("/", validateToken, async (req, res) => {
    // if there isn't a user, then don't show any forms
    if (!req.user) {
        res.json({error: "User not logged in. (dev: forms/ error)"});
    } else {
        // if the user is an admin, show all forms in descending order of updated
        if (req.user.isAdmin) {
            const listOfForms = await Forms.findAll({order: [['updatedAt']]})
            console.log(listOfForms)
            res.json(listOfForms)
        } 
        // otherwise, show only forms for the student in descending order of updated
        else {
            const listOfForms = await Forms.findAll( { where: { student: req.user.student }, order: [['updatedAt']] })
            console.log(listOfForms)
            res.json(listOfForms)
        }
    }
})

// getting information of a specific form by id
router.get("/byId/:id", validateToken, async (req, res) => {
    // if the user isn't logged in, then return error
    if (!req.user) {
        res.json({error: "User not logged in. (dev: forms/byId/:id error)"});
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
        res.json({error: "User not logged in. (dev: forms/byUserId/:id error)"});
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
router.put("/byId/:id", validateToken, async (req, res) => {
    const id = req.params.id // get the form id
    const beforeForm = await Forms.findByPk(id);
    const [updated] = await Forms.update(req.body, {where: {id: id }}); // update the exact form
    if (req.body.status === "approved") await Forms.update({ wasApproved: true}, {where: { id: id } });
    if (req.body.newNonApprovedHours != 0) {
        const currentUser = await Users.findByPk(beforeForm.UserId);
        var newNonApprovedHours = currentUser.nonApprovedHours + req.body.newNonApprovedHours;
        await Users.update({ nonApprovedHours: newNonApprovedHours}, { where: {id: currentUser.id}});
    }
    if (req.body.status === "completed") {
        const updatedForm = await Forms.findByPk(id);
        const currentUser = await Users.findByPk(beforeForm.UserId);
        await Users.update({ nonApprovedHours: currentUser.nonApprovedHours - updatedForm.nonApprovedHours, verifiedHours: currentUser.verifiedHours + updatedForm.nonApprovedHours }, { where: {id: currentUser.id}})

        await Forms.update({ wasVerified: true, verifiedHours: updatedForm.nonApprovedHours, nonApprovedHours: 0,}, {where: {id: id}});
    }
    if (req.body.status === "rejected") {
        await Forms.update({ wasApproved: false, wasVerified: false, verifiedHours: 0, nonApprovedHours: 0,}, {where: {id: id}});
    }

    // if it has been updated
    if (updated) {
        const updatedForm = await Forms.findByPk(id); // great! we can return the form back
        res.json(updatedForm)
        // console.log(updatedForm)
        const formOwner = req.body;
        const currentUser = req.user;
        if (currentUser.id != formOwner.UseId) {
        const mailOptions = {
            from: email, // sender address
            to: formOwner.student, // list of receivers
            subject: 'Your community service proposal \"' + updatedForm.proposalName + '\" has been modified! See what changed.', // Subject line
            text: 'Hello, ' + formOwner.student + ', your form \"' + updatedForm.proposalName + '\" has been modified.' // plain text body
        };
        transporter.sendMail(mailOptions, function (err, info) {
            // if (err)
            //     console.log(err)
            // else
            //     console.log(info);
        });
    }
    } else {
        res.json(updated); // just return the information
    }
})

router.put("/upload/:id", upload.single('image'), async (req, res) => {
    if (!req.file) {
        res.json({ error: "Please upload a file. "})
    } else {
        if (!req.file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            res.json({ error: "Only image files (jpg, jpeg, png) are allowed. "})
        } else {
            const image = req.file.filename;
            const id = req.params.id;
            await Forms.update({ image: image }, { where: { id: id } });
            res.json("Uploaded successfully.");
        }
    }
})

router.get("/upload/:id", async (req, res) => {
    const id = req.params.id;
    const form = await Forms.findByPk(id);
    const image = form.image;
    res.json(image);
})

// delete a form
router.delete("/:formId", validateToken, async (req, res) => {
    const formId = req.params.formId;
    const form = await Forms.findByPk(formId);
    const currentUser = await Users.findByPk(form.UserId);
    await Users.update({ nonApprovedHours: currentUser.nonApprovedHours - form.nonApprovedHours, verifiedHours: currentUser.verifiedHours - form.verifiedHours, }, { where: {id: currentUser.id}});

    Forms.destroy({where: {
        id: formId,
    }});

    res.json("DELETED SUCCESSFULLY");
})

module.exports = router