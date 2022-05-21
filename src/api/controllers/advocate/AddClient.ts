import { Handler } from 'express';
import Advocate from '../../models/advocate/advocate';
import IAdvocate from '../../models/advocate/InterfaceAdvocateRegister';
import Auth from '../../models/auth/authModel';
import IAuth from '../../models/auth/InterfaceAuth';

const AddClient: Handler = async (req, res, next) => {
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
        const {
            courtComplex,
            caseType,
            caseNumber,
            caseYear,
            clientName,
            contactNumber,
            address,
            IAdetalils,
            nextHearingData,
        } = req.body;
        const data = {
            courtComplex: courtComplex,
            caseType: caseType,
            caseNumber: caseNumber,
            caseYear: caseYear,
            clientName: clientName,
            contactNumber: contactNumber,
            address: address,
            IAdetalils: IAdetalils,
            nextHearingData: nextHearingData,
        }
        const advocate : IAdvocate = await Advocate.findOne({ user: user._id }).lean();
        if(!advocate){
            return res.status(404).json({
                    status: "FAILED",
                    message: "This user type isn't allowed to login!!",
                })
        } else {
            // console.log(typeof advocate.clientDetails,advocate.clientDetails, "3")
            console.log( typeof advocate.clientDetails)
            if(advocate.clientDetails === undefined){
                await Advocate.updateOne({ user: user._id , $addToSet: { clientDetails : data }}).lean();
                console.log("raghav")
            } else {
                console.log(typeof advocate.clientDetails);
            }
        }
        return res.status(200).json({
            status: "SUCCESSFUL",
            message: "This client has been added!!",
        })

    } catch {
        return res.send("Not working");
    }
}

export { AddClient }