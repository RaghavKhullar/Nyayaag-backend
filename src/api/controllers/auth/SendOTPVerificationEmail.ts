import bcrypt from 'bcrypt';
import transporter from "../../utils/nodeMail";
import OTPVerification from "../../models/auth/userOTPVerification"

const sendOtpVerificationEmail = async (username: string, res: any) => {
    console.log("yes");
    try {
        console.log(username);
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const mailOptions = {
            from: "nyayaag123@outlook.com",
            to: username,
            subject: "verify your email",
            html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the registration process </p>
            <p>This code <b>expired in 1 hour</b>.</p>`,
        }
        console.log(mailOptions);
        const hashedotp = await bcrypt.hash(otp, 10);
        console.log(hashedotp);
        const result = await OTPVerification.create({
            username: username,
            otp: hashedotp,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });
        console.log(result);
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server is ready to take our messages", success);
            }
        });
        transporter.sendMail(mailOptions);
        res.status(201).json({ message: `Otp sent`, success: true, status: 201 });

    } catch (error) {
        res.json({ status: 500, msg: error });
    }
}

export default sendOtpVerificationEmail;