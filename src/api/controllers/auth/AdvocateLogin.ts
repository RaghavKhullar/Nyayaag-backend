import {Handler} from "express";
import Advocate from "../../modals/auth/advocate";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const JWT_SECRET = "amsgiaowjwoig293u498238*Y(&^^Bhjbigu";

const advocateLogin: Handler =  async (req, res , next)=>{
    try{
        const { username , password } = req.body;
        const user = await Advocate.findOne({ username: username }).lean();
        const userPassword : string =  user?.password || '';
        if(!user){
            res.status(404).json({ message : "Invalid Credentials",  success: false  , status: 404});
        }
        if(await bcrypt.compare( password, userPassword)){

            const token = jwt.sign({
                id: user?._id,
                username: user?.username
            },JWT_SECRET)

            return res.json({ status:'ok',  data: token})
        }else{
            res.status(401).json({ message : "Invalid Credentials",  success: false  , status: 401});
        }

    } catch (err) {
        next({ status: 500 , msg:err });
    }
}

export { advocateLogin };
