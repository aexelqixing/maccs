const nodemailer = require('nodemailer');
const { email, password } = require('../config.js');

const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail'
    auth: {
        user: email,
        pass: password,
    }
});

export default transporter;