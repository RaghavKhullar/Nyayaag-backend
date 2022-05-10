import {Router} from "express";
import { UpdateProfile , updatePersonalDetails , updateAdvocateBarDetails } from "../controllers/advocate/UpdateProfile"

const router = Router();

router.get("/update",UpdateProfile)

router.put("/updatePersonalDetails", updatePersonalDetails )

router.put("/updateAdvocateBarDetails", updateAdvocateBarDetails )

export default router;
