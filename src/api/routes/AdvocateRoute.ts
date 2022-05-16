import {Router} from "express";
import {  updatePersonalDetails , updateAdvocateBarDetails } from "../controllers/advocate/UpdateProfile"

const router = Router();

router.put("/updatePersonalDetails", updatePersonalDetails )

router.put("/updateAdvocateBarDetails", updateAdvocateBarDetails )

export default router;
