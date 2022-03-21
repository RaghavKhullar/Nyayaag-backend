import {Router} from "express";
import { advocateRegister } from "../controllers/auth/AdvocateRegister";
import { advocateLogin } from "../controllers/auth/AdvocateLogin"
import {verifyOtp} from "../controllers/auth/VerifyOtp";
import { ResendOTPVerification } from "../controllers/auth/ResendOTPVerification";


const router = Router();

router.get('/login', (req,res) => {
    res.send("get route for advocate login")
})

router.post('/register',advocateRegister);
router.post('/login',advocateLogin);
router.post('/verifyOTP', verifyOtp)
router.post("/resendOTPVerification",ResendOTPVerification)

export default router;
