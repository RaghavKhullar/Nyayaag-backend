import { Schema , model , Model } from "mongoose";
import IAdvocate from "./Interface";

const AdvocateSchema: Schema = new Schema({
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
    personalDetails: {
        type: Object,
    },
    advocateBarDetails: {
        type: Object,
    },
})

const Advocate: Model<IAdvocate> = model<IAdvocate>("Advocate", AdvocateSchema);

export default Advocate;