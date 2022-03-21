import {Router} from "express";
<<<<<<< HEAD
import { UpdateDetails } from "../controllers/client/updateProflie";
import {GetAdvocate}from "../controllers/client/GetAdvocate"
const router = Router();

router.get('/', (req,res) => {
    res.send("get route for client login")
})

router.post('/update',UpdateDetails);
router.post('/getAdvocate',GetAdvocate);

=======
<<<<<<<< HEAD:src/api/routes/UserRoute.ts
import { UserRegister } from "../controllers/auth/UserRegister";
import { UserLogin } from "../controllers/auth/UserLogin"
import {verifyOtp} from "../controllers/auth/VerifyOtp";
import { ResendOTPVerification } from "../controllers/auth/ResendOTPVerification";

========
import { AddClient } from "../controllers/advocate/AddClient";
import {  updatePersonalDetails , updateAdvocateBarDetails , getDetails } from "../controllers/advocate/UpdateProfile"
import {CaseReminder , ViewClients} from "../controllers/advocate/CaseReminder"
>>>>>>>> feat: add userAuth:src/api/routes/AdvocateRoute.ts

const router = Router();

router.post("/updatePersonalDetails", updatePersonalDetails )

router.post("/updateAdvocateBarDetails", updateAdvocateBarDetails )

router.post("/addclient",AddClient)

router.post("/caseReminder",CaseReminder)

<<<<<<<< HEAD:src/api/routes/UserRoute.ts
router.post('/register',UserRegister);
router.post('/login',UserLogin);
router.post('/verifyOTP', verifyOtp)
router.post("/resendOTPVerification",ResendOTPVerification)
========
router.post("/profile",getDetails)
>>>>>>>> feat: add userAuth:src/api/routes/AdvocateRoute.ts

router.post("/viewClients",ViewClients)
>>>>>>> feat: add userAuth
export default router;
