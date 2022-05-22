import {Router} from "express";
import { AddClient } from "../controllers/advocate/AddClient";
import {  updatePersonalDetails , updateAdvocateBarDetails } from "../controllers/advocate/UpdateProfile"
import {CaseReminder} from "../controllers/advocate/CaseReminder"
const router = Router();

router.post("/updatePersonalDetails", updatePersonalDetails )

router.post("/updateAdvocateBarDetails", updateAdvocateBarDetails )

router.post("/addclient",AddClient)

router.post("/caseReminder",CaseReminder)

export default router;
