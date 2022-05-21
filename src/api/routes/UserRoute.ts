import {Router} from "express";

const router = Router();

router.get('/', (req,res) => {
    res.send("get route for client login")
})

export default router;
