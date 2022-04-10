import mongoose,{ Schema , model , Model } from "mongoose";
import IAdvocate from "./InterfaceAdvocateRegister";

const AdvocateSchema: Schema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "auth_user",
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