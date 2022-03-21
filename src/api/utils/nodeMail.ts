import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user: "nyayaag123@outlook.com",
        pass: "manavaggarwal123",
    },
});

export default transporter;