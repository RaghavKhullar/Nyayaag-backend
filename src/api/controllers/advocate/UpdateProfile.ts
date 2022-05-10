import { Handler } from 'express';
import Auth from "../../models/auth/authModel"
import Advocate from "../../models/advocate/advocate"
import IAdvocate from '../../models/advocate/InterfaceAdvocateRegister';
import IAuth from '../../models/auth/InterfaceAuth';

const UpdateProfile: Handler = async (req, res, next) => {
    console.log(req.session)
    if (!req.session.user) {
        res.status(404).json({
            status: "FAILED",
            message: "Please Login before entering!!",
        })
    }
    const user : IAuth = await Auth.findOne({ username: req.session.user || null }).lean();
    if (!user) {
        res.status(404).json({
            status: "FAILED",
            message: "The requested User doesn't exists!!",
        })
    } else {
        if (!user.verified) {
            res.status(404).json({
                status: "FAILED",
                message: "Please Verify your username to login!!",
            })
        }
        if (user.userType !== "advocate") {
            res.status(404).json({
                status: "FAILED",
                message: "This user type isn't allowed to login!!",
            })
        }
        const advocate : IAdvocate = await Advocate.findOne({ user: user._id }).lean();
        if (!advocate) {
            const newAdvocate = {
                user: user._id,
                personalDetails: {
                    salutation: "",
                },
                advocateBarDetails: {
                    state: "",
                }
            }
            const result = await Advocate.create(newAdvocate);
            console.log(result)
        }
        else {
            console.log("User is already created please update the details!!")
        }
    }
}
const updatePersonalDetails: Handler = async (req, res, next) => {
    console.log("UpdatePersonalDetails");
    try {

        const user : IAuth = await Auth.findOne({ username: req.session.user || null }).lean();
        if (!user) {
            res.status(404).json({
                status: "FAILED",
                message: "The requested User doesn't exists!!",
            })
        } else {
            if (!user.verified) {
                res.status(404).json({
                    status: "FAILED",
                    message: "Please Verify your username to login!!",
                })
            }
            if (user.userType !== "advocate") {
                res.status(404).json({
                    status: "FAILED",
                    message: "This user type isn't allowed to login!!",
                })
            }
        }
        const { salutation, firstName, middleName, lastName, gender, emailAddress, DOB, phoneNo } = req.body;
        const data = {
            salutation: salutation,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            gender: gender,
            emailAddress: emailAddress,
            DOB: DOB,
            phoneNo: phoneNo,
        }
        console.log(user);
        const advocate = await Advocate.updateOne( { user : user._id } , { $set : {personalDetails : data }});
        res.status(200).json({
            status: "SUCCESSFUL",
            message: "This user has been updated!!",
        })
    } catch {
        res.send("Not working")
    }
}
const updateAdvocateBarDetails: Handler = async (req, res, next) => {
    console.log("UpdatePersonalDetails");
    try {

        const user : IAuth = await Auth.findOne({ username: req.session.user || null }).lean();
        if (!user) {
            res.status(404).json({
                status: "FAILED",
                message: "The requested User doesn't exists!!",
            })
        } else {
            if (!user.verified) {
                res.status(404).json({
                    status: "FAILED",
                    message: "Please Verify your username to login!!",
                })
            }
            if (user.userType !== "advocate") {
                res.status(404).json({
                    status: "FAILED",
                    message: "This user type isn't allowed to login!!",
                })
            }
        }
        const { state, district, barCouncilNumber, areaOfPractice, specialization, officeAddress, pinCode } = req.body;
        const data = {
            state: state,
            district: district,
            barCouncilNumber: barCouncilNumber,
            areaOfPractice: areaOfPractice,
            specialization: specialization,
            officeAddress: officeAddress,
            pinCode: pinCode,
        }
        console.log(user);
        const advocate = await Advocate.updateOne( { user : user._id } , { $set : { advocateBarDetails : data }});
        res.status(200).json({
            status: "SUCCESSFUL",
            message: "This user has been updated!!",
        })
    } catch {
        res.send("Not working")
    }
}

export { UpdateProfile, updatePersonalDetails , updateAdvocateBarDetails};