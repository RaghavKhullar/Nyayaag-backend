import { Schema , model , Model } from "mongoose";

const AdvocateSchema: Schema = new Schema({
    Username: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Salutation: {
        type: String,
        status: { type: String , enum:[ "Mr" , "Miss" , "Mrs" , "Mx" ]}
    },
    FirstName: {
        type: String,
        required: true
    },
    MiddleName:{
        type: String
    },
    LastName:{
        type: String,
    }
    
})