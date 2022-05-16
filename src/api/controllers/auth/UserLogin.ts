import {Handler} from "express";
import Auth from "../../models/auth/authModel";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const JWT_SECRET = "amsgiaowjwoig293u498238*Y(&^^Bhjbigu";

const UserLogin: Handler =  async (req, res , next)=>{
    try{
        const { username , password } = req.body;
        const user = await Auth.findOne({ username: username }).lean();
        const userPassword : string =  user?.password || '';
        if(!user){
            res.status(404).json({ message : "Invalid Credentials",  success: false  , status: 404});
        }
        if(!user?.verified){
            res.status(404).json({
                status: "FAILED",
                message: "Please verify the usernaem to login!!",
            })
        }
        if(await bcrypt.compare( password, userPassword)){

            const token = jwt.sign({
                id: user?._id,
                username: user?.username
            },JWT_SECRET)
            req.session.user = username;
            req.session.save(err => {
                if(err){
                    console.log(err);
                } else {
                    console.log(req.session)
                }
            });
            return res.status(200).json({ status: "ok",  username: req.session.user , userType : user?.userType})
        }else{
            res.status(401).json({ message : "Invalid Credentials",  success: false  , status: 401});
        }

    } catch (err) {
        next({ status: 500 , msg:err });
    }
}

export { UserLogin };
