import {Router} from "express";
import { advocateRegister } from "../controllers/auth/AdvocateRegister";
import { advocateLogin } from "../controllers/auth/AdvocateLogin"

const router = Router();

router.get('/login', (req,res) => {
    res.send("get route for advocate login")
})

router.post('/register',advocateRegister);
router.post('/login',advocateLogin);

export default router;
