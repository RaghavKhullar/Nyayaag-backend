import {Router} from "express";

const router = Router();

router.get('/', (req,res) => {
    res.send("get route for clinet login")
})

export default router;
