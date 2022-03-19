import {Handler} from "express";
import Advocate from "../../models/auth/advocate";
import bcrypt from "bcrypt"

const advocateRegister: Handler =  async (req, res , next)=>{
    try{
        const { username , password , confirmPassword , securityQuestion , securityAnswer} = req.body;
        console.log(securityQuestion , securityAnswer);
        const duplicates = await Advocate.findOne({ username: username }).exec();
        if( password !== confirmPassword){
            res.status(401).json({ message : "Password and confirm password doesn't match.",  success: false  , status: 401});
        }
        if(duplicates){
            res.status(409).json({ message : "User name is already taken.",  success: false  , status: 409}); // if we find duplicates
        }
        try {
            const hashed = await bcrypt.hash(password , 10);
            const result = await Advocate.create({
                username: username,
                password: hashed,
                securityQuestion: securityQuestion,
                securityAnswer: securityAnswer,
            });
            res.status(201).json({ message : `New user Created ${result}` ,  success: true , status : 201});        
        } catch (err) {
            res.status(500).json({ message : err ,  success: false  , status: 500});
        }
    } catch (err) {
        next({ status: 500 , msg: err });
    }
}

export { advocateRegister };
