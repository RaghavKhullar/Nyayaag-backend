import {Router} from "express";
import { UpdateDetails } from "../controllers/client/updateProflie";
const router = Router();

router.get('/', (req,res) => {
    res.send("get route for client login")
})

router.post('/update',UpdateDetails);

export default router;
