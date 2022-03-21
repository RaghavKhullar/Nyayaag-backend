import { Schema , model , Model } from "mongoose";
import IAuth from "./InterfaceAuth";

const AuthSchema: Schema = new Schema({
    username: {
        type: String,
        required:true,
    },
    password: {
        type: String,
        required:true,
    },
    securityQuestion: {
        type: String,
        required: true
    },
    securityAnswer: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
    }
})

const Auth: Model<IAuth> = model<IAuth>("auth_user", AuthSchema);

export default Auth;