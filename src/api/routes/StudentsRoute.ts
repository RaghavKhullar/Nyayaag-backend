import {Router} from "express";
// import { UpdateProfile , updatePersonalDetails , updateAdvocateBarDetails } from "../controllers/advocate/UpdateProfile"
import { UpdateProfile , UpdateDetails } from "../controllers/student/UpdateProfile";

const router = Router();

router.get("/update",UpdateProfile)

router.put("/update",UpdateDetails)

// router.put("/updatePersonalDetails", updatePersonalDetails )

// router.put("/updateAdvocateBarDetails", updateAdvocateBarDetails )

export default router;
