import  bcrypt from 'bcrypt';
import {Handler} from "express";
// import transporter from "../../utils/nodeMail";
import OTPVerification from "../../models/auth/userOTPVerification"
import Advocate from "../../models/auth/authModel";

const verifyOtp: Handler = async (req , res) => {
    try {
        const {username , otp} = req.body;
        console.log(username , otp)
        if(!username || !otp){
            throw Error("empty otp details are not allowed");
        } else {
            const userOTPVerificationRecords = await OTPVerification.find({
                username
            })
            if(userOTPVerificationRecords.length <= 0){
                // no records found
                throw new Error("the account does exists or has been verified already!!");
            } else {
                const { expiresAt } = userOTPVerificationRecords[0];
                console.log(expiresAt)
                const currentTime = Date.now();
                const hashedOTP = userOTPVerificationRecords[0].otp;
                if(expiresAt.getTime() < currentTime){
                    await OTPVerification.deleteMany({ username })
                    console.log(hashedOTP , "working")
                    throw new Error("Code has been expired. Please request again!");
                } else {
                    const validOTP = await bcrypt.compare(otp,hashedOTP);
                    if(!validOTP){
                        // input otp is wrong
                        throw new Error("Invalid Otp");
                    } else {
                        console.log("otp is matched")
                        await Advocate.updateOne({ username: username } , { verified: true });
                        await OTPVerification.deleteMany({ username: username });
                        res.json({
                            status: "VERIFIED",
                            message: "user email verified successfully",
                        })
                    }
                }
            }

        }
    } catch (error) {
        res.json({ status: "FAILED", msg: error });
    }
}

export {verifyOtp};