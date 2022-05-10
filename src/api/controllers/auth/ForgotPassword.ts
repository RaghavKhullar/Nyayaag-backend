import bcrypt from 'bcrypt';
import { Handler } from 'express';
// import bcrypt from 'bcrypt';
// import transporter from "../../utils/nodeMail";
import Auth from '../../models/auth/authModel';
import PasswordReset from "../../models/auth/passwordReset"
import { v4 as uuidv4 } from "uuid"
import transporter from '../../utils/nodeMail';

const ForgotPassword : Handler = async (req, res , next) => {
    console.log("yes");
    try {
        const { username ,  redirectUrl } = req.body;
        console.log(username)
        Auth
            .findOne({ username: username })
            .then((data) => {
                if(data){
                    console.log(data);
                    if(data.verified === false){
                        // user is not verfied!!
                        res.json({
                            status: "FAILED",
                            message: "Account is not validated yet!!",
                        }) 
                    } else {
                          const resetString = uuidv4() + username;

                          PasswordReset
                            .deleteMany({username : username})
                            .then(result => {
                                console.log(result)
                                // reset records deleted successfully
                                const mailOptions = {
                                    from: "nyayag2022@outlook.com",
                                    to: username,
                                    subject: "Password Reset",
                                    html: `<p>click the link below to reset your password
                                    <a href=${redirectUrl + "/" + username + "/" + resetString}>Click here</a>
                                    </p>`,
                                }

                                bcrypt
                                    .hash(resetString , 10)
                                    .then( async (hashedResetString : string) => {
                                        console.log(hashedResetString);
                                        const result = await PasswordReset.create({
                                            username: username,
                                            resetString: hashedResetString,
                                            createdAt: Date.now(),
                                            expiresAt: Date.now() + 3600000,
                                        })
                                        if(!result){
                                            res.json({
                                                status: "FAILED",
                                                message: "Failed Saving data in data base!!",
                                            })
                                        } else {
                                            transporter
                                                .sendMail(mailOptions)
                                                .then( () => {
                                                    // reset email sent and password reset record saved
                                                    res.json({
                                                        status: "PENDING",
                                                        message: "Password reset email sent!"
                                                    })
                                                })
                                                .catch( error => {
                                                    console.log(error);
                                                    res.json({
                                                        status: "FAILED",
                                                        message: "password reset mail failed",
                                                    })
                                                })
                                        }
                                    })
                                    .catch( (err : Error) => {
                                        console.log(err)
                                        res.json({
                                            status: "FAILED",
                                            message: "Error Occured while hashing the password reset data!!",
                                        })
                                    })
                                
                            })
                            .catch(err => {
                                console.log(err);
                                res.json({
                                    status: "FAILED",
                                    message: "Clearing existing password reset records failed",
                                })
                            })
                    }
                } else {
                    res.json({
                        status: "FAILED",
                        message: "No account with the supplied email exists!!",
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });

    } catch (error) {
        res.json({ status: 500, msg: error });
    }
}

export default ForgotPassword;