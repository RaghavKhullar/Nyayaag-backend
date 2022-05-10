import { Handler } from 'express';
import IStudent from '../../models/student/InterfaceStudent';
import Student from '../../models/student/student';
import IAuth from '../../models/auth/InterfaceAuth';
import Auth from '../../models/auth/authModel';

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
        if (user.userType !== "student") {
            res.status(404).json({
                status: "FAILED",
                message: "This user type isn't allowed to login!!",
            })
        }
        const student : IStudent = await Student.findOne({ user: user._id }).lean();
        if (!student) {
            const newStudent = {
                user: user._id,
            }
            await Student
                .create(newStudent)
                .then ( () => {
                    res.status(200).json({
                        status: "SUCCESSFUL",
                        message: "This user can been updated!!",
                    })
                })
                . catch ( (err) => {
                    res.status(400).json({
                        status : "FAILED",
                        message : err
                    })
                });
        }
        else {
            console.log("User is already created please update the details!!")
        }
    }
}
const UpdateDetails: Handler = async (req, res, next) => {
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
            if (user.userType !== "student") {
                res.status(404).json({
                    status: "FAILED",
                    message: "This user type isn't allowed to login!!",
                })
            }
        }
        const { studentName, nameOfCollege, RollNo, Course, CourseDuration, address, pincode } = req.body;
        const data = {
            studentName: studentName,
            nameOfCollege: nameOfCollege,
            RollNo: RollNo,
            Course: Course,
            CourseDuration: CourseDuration,
            address: address,
            pincode: pincode
        }
        console.log(user);
        await Student.updateOne({ user : user._id } ,  { $set : data });
        res.status(200).json({
            status: "SUCCESSFUL",
            message: "This user has been updated!!",
        })
    } catch {
        res.send("Not working")
    }
}

export { UpdateProfile , UpdateDetails}