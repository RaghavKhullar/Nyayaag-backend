import {Handler} from "express";
import UserModel from "../../models/auth/authModel";
import bcrypt from "bcrypt"
import sendOtpVerificationEmail from "./SendOTPVerificationEmail";

const UserRegister: Handler =  async (req, res , next)=>{
    try{
        const { username , password , confirmPassword , securityQuestion , securityAnswer , userType } = req.body;
        const duplicates = await UserModel.findOne({ username: username }).exec();
        if( password !== confirmPassword){
            return res.status(401).json({ message : "Password and confirm password doesn't match.",  success: false  , status: 401});
        }
        if(duplicates){
            return res.status(409).json({ message : "User name is already taken.",  success: false  , status: 409}); // if we find duplicates
        }
        try {
            const hashed = await bcrypt.hash(password , 10);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const result = await UserModel.create({
                username: username,
                password: hashed,
                securityQuestion: securityQuestion,
                securityAnswer: securityAnswer,
                verified: false,
                userType: userType,
            });
            console.log(req)
            sendOtpVerificationEmail(username,res);
        } catch (err) {
            return res.status(500).json({ message : err ,  success: false  , status: 500});
        }
    } catch (err) {
        return res.status(500).json({ status: 500 , msg: err });
    }
}

export { UserRegister };
