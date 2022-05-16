import { Handler } from 'express';
import IStudent from '../../models/student/InterfaceStudent';
import Student from '../../models/student/student';
import IAuth from '../../models/auth/InterfaceAuth';
import Auth from '../../models/auth/authModel';

const UpdateDetails: Handler = async (req, res, next) => {
    console.log("UpdatePersonalDetails");
    try {
        if (!req.session.user) {
            res.status(404).json({
                status: "FAILED",
                message: "Please Login before entering!!",
            })
        }
        const user: IAuth = await Auth.findOne({ username: req.session.user || null }).lean();
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
        console.log(user);
        const student: IStudent = await Student.findOne({ user: user._id }).lean();
        if (!student) {
            const newStudent = {
                user: user._id,
                studentName: studentName,
                nameOfCollege: nameOfCollege,
                RollNo: RollNo,
                Course: Course,
                CourseDuration: CourseDuration,
                address: address,
                pincode: pincode

            }
            await Student
                .create(newStudent)
                .then(() => {
                    res.status(200).json({
                        status: "SUCCESSFUL",
                        message: "This user can been updated!!",
                    })
                })
                .catch((err) => {
                    res.status(400).json({
                        status: "FAILED",
                        message: err
                    })
                });
        } else {
            await Student.updateOne({ user: user._id }, {
                $set: {
                    studentName: studentName,
                    nameOfCollege: nameOfCollege,
                    RollNo: RollNo,
                    Course: Course,
                    CourseDuration: CourseDuration,
                    address: address,
                    pincode: pincode
                }
            });
        }
        res.status(200).json({
            status: "SUCCESSFUL",
            message: "This user has been updated!!",
        })
    } catch {
        res.send("Not working")
    }
}

export { UpdateDetails }