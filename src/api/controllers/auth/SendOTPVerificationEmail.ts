import bcrypt from 'bcrypt';
import transporter from "../../utils/nodeMail";
import OTPVerification from "../../models/auth/userOTPVerification"

const sendOtpVerificationEmail = async (username: string, res: any) => {
    try {
        transporter
            .verify( async (error , success) => {
                if (error) {
                    console.log(error, "email service isn't working");
                } else {
                    console.log(success , "Mail is ready")
                    console.log(username,  success);
                    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
                    const mailOptions = {
                        from: "nyayaag123@outlook.com",
                        to: username,
                        subject: "verify your email",
                        html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the registration process </p><p>This code <b>expired in 1 hour</b>.</p>`,
                    }
                    const hashedotp = await bcrypt.hash(otp, 10);
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const result = await OTPVerification.create({
                        username: username,
                        otp: hashedotp,
                        createdAt: Date.now(),
                        expiresAt: Date.now() + 3600000,
                    });
                    transporter.sendMail(mailOptions);
                    return res.status(201).json({ message: `Otp sent`, success: true, status: 201 });
                }
            })
    } catch (error) {
        return res.json({ status: 500, msg: error });
    }
}

export default sendOtpVerificationEmail;