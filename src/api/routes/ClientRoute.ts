import {Router} from "express";

const router = Router();

router.get('/login', (req,res) => {
    res.send("get route for Client login")
})
router.get('/register', (req,res) => {
    res.send("get route for Clinet register")
})

export default router;