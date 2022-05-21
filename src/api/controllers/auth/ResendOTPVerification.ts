import { Handler } from 'express';
import OTPVerification from '../../models/auth/userOTPVerification';
import sendOtpVerificationEmail from './SendOTPVerificationEmail';

const ResendOTPVerification:Handler = async ( req , res) => {
    try {
        const {username} = req.body;
        console.log(username)
        if(!username){
            console.log("Empty user details are not allowed!")
            throw Error("Empty user details are not allowed!");
        } else {
            await OTPVerification.deleteMany({ username });
            sendOtpVerificationEmail(username , res );
        }

    } catch (error) {
        return res.json({
            status: "FAILED",
            msg: error
        })
    }
}

export {ResendOTPVerification}