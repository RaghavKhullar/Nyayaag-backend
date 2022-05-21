import {Router} from "express";
import { AddClient } from "../controllers/advocate/AddClient";
import {  updatePersonalDetails , updateAdvocateBarDetails } from "../controllers/advocate/UpdateProfile"

const router = Router();

router.post("/updatePersonalDetails", updatePersonalDetails )

router.post("/updateAdvocateBarDetails", updateAdvocateBarDetails )

router.post("/addclient",AddClient)

export default router;
