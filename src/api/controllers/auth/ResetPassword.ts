import bcrypt from 'bcrypt';
import { Handler } from 'express';
import Auth from '../../models/auth/authModel';
// import transporter from "../../utils/nodeMail";
// import Auth from '../../models/auth/authModel';
import PasswordReset from "../../models/auth/passwordReset"
// import { v4 as uuidv4 } from "uuid"

const ResetPassword : Handler = async (req, res , next) => {
    try {
        const { username ,  resetString , newPassword } = req.body;
         
        PasswordReset
            .find({username : username})
            .then( result => {
                if(result){
                    console.log(result);
                    // password reset record exists
                    const { expiresAt } = result[0];
                    const HashedResetString = result[0].resetString;
                    const currentTime = Date.now();
                    if(expiresAt.getTime() < currentTime){
                        PasswordReset
                            .deleteOne({username})
                            .then( () => {
                                return res.json({
                                    status: "FAILED",
                                    message: "Password Link has been Expired.",
                                })
                            }
                            )
                            .catch( error => {
                                console.log(error)
                                return res.json({
                                    status: "FAILED",
                                    message: "password reset request not found.",
                                })
                            })
                    } else {
                        // valid reset records exists so we validate the reset string
                        // First compare the hashed reset string

                        bcrypt
                        .compare( resetString ,  HashedResetString)
                        .then(result => {
                            if(result){
                                console.log(result)
                                bcrypt
                                    .hash(newPassword , 10)
                                    .then( hashedNewPassword => {
                                        // update user password
                                        Auth
                                            .updateOne({username : username}, {password : hashedNewPassword})
                                            .then( () => {
                                                PasswordReset
                                                    .deleteOne({username : username})
                                                    .then(()=>{
                                                        return res.json({
                                                            status: "SUCCESS",
                                                            message: "Password Update was successfull.",
                                                        })
                                                    })
                                                    .catch( err => {
                                                        console.log(err);
                                                        return res.json({
                                                            status: "FAILED",
                                                            message: "An error occured while finalizing password reset.",
                                                        })
                                                    })
                                            })
                                            .catch(err => {
                                                console.log(err)
                                                return res.json({
                                                    status: "FAILED",
                                                    message: "Updating user password failed.",
                                                })
                                            })
                                    })
                                    .catch( err => {
                                        console.log(err)
                                        return res.json({
                                            status: "FAILED",
                                            message: "Error while hashing new password.",
                                        })
                                    })
                            } else {
                                return res.json({
                                    status: "FAILED",
                                    message: "Invaild Password reset details passed.",
                                })
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            return res.json({
                                status: "FAILED",
                                message: "Comparing password reset string failed.",
                            })
                        })
                    }
                } else {
                    return res.json({
                        status: "FAILED",
                        message: "password reset request not found.",
                    })
                }
            })
            .catch(error => {
                console.log(error);
                return res.json({
                    status: "FAILED",
                    message: "Checking for password reset record failed!",
                })
            })
    } catch (error) {
        return res.json({ status: 500, msg: error });
    }
}

export default ResetPassword;