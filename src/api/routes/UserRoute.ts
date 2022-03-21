import {Router} from "express";
import { UserRegister } from "../controllers/auth/UserRegister";
import { UserLogin } from "../controllers/auth/UserLogin"
import {verifyOtp} from "../controllers/auth/VerifyOtp";
import { ResendOTPVerification } from "../controllers/auth/ResendOTPVerification";


const router = Router();

router.get('/login', (req,res) => {
    res.send("get route for advocate login")
})

router.post('/register',UserRegister);
router.post('/login',UserLogin);
router.post('/verifyOTP', verifyOtp)
router.post("/resendOTPVerification",ResendOTPVerification)

export default router;
