import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    requireTLS: true,//this parameter solved problem for me
    auth: {
        user: 'nyayaag123@outlook.com',
        pass: 'manavaggarwal123'
    }
});

export default transporter;