import { Handler } from 'express';
import Auth from "../../models/auth/authModel"
import Advocate from "../../models/advocate/advocate"
import IAdvocate from '../../models/advocate/InterfaceAdvocateRegister';
import IAuth from '../../models/auth/InterfaceAuth';
const updatePersonalDetails: Handler = async (req, res, next) => {
    console.log("UpdatePersonalDetails");
    try {
        if (req.session && !req.session.user) {
            return res.status(404).json({
                status: "FAILED",
                message: "Please Login before entering!!",
            })
        }
        const user: IAuth = await Auth.findOne({ _id: req.session.user || null }).lean();
        if (!user) {
            return res.status(404).json({
                status: "FAILED",
                message: "The requested User doesn't exists!!",
            })
        } else {
            if (!user.verified) {
                return res.status(404).json({
                    status: "FAILED",
                    message: "Please Verify your username to login!!",
                })
            }
            if (user.userType !== "advocate") {
                return res.status(404).json({
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
        const advocate: IAdvocate = await Advocate.findOne({ user: user._id }).lean();
        if (!advocate) {
            const newAdvocate = {
                user: user._id,
                personalDetails: {
                    salutation: salutation,
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    gender: gender,
                    emailAddress: emailAddress,
                    DOB: DOB,
                    phoneNo: phoneNo,
                },
                advocateBarDetails: {
                    state: "",
                },
                clientDetails:[],
            }
            const result = await Advocate.create(newAdvocate);
            console.log(result)
        }
        else {
            await Advocate.updateOne({ user: user._id }, { $set: { personalDetails: data } });
        }
        return res.status(200).json({
            status: "SUCCESSFUL",
            message: "This user has been updated!!",
        })
    } catch {
        return res.send("Not working")
    }
}
const updateAdvocateBarDetails: Handler = async (req, res, next) => {
    console.log("UpdatePersonalDetails");
    try {
        if (req.session && !req.session.user) {
            return res.status(404).json({
                status: "FAILED",
                message: "Please Login before entering!!",
            })
        }
        const user: IAuth = await Auth.findOne({ _id: req.session.user || null }).lean();
        if (!user) {
            return res.status(404).json({
                status: "FAILED",
                message: "The requested User doesn't exists!!",
            })
        } else {
            if (!user.verified) {
                return res.status(404).json({
                    status: "FAILED",
                    message: "Please Verify your username to login!!",
                })
            }
            if (user.userType !== "advocate") {
                return res.status(404).json({
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
        const advocate: IAdvocate = await Advocate.findOne({ user: user._id }).lean();
        if (!advocate) {
            const newAdvocate = {
                user: user._id,
                personalDetails: {
                    salutation: ""
                },
                advocateBarDetails: {
                    state: state,
                    district: district,
                    barCouncilNumber: barCouncilNumber,
                    areaOfPractice: areaOfPractice,
                    specialization: specialization,
                    officeAddress: officeAddress,
                    pinCode: pinCode,
                },
                clientDetails: [],
            }
            const result = await Advocate.create(newAdvocate);
            console.log(result)
        } else {
            await Advocate.updateOne({ user: user._id }, { $set: { advocateBarDetails: data } });
        }
        return res.status(200).json({
            status: "SUCCESSFUL",
            message: "This user has been updated!!",
        })
    } catch {
        return res.send("Not working")
    }
}

export { updatePersonalDetails, updateAdvocateBarDetails };