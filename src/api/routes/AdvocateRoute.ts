import {Router} from "express";
// import bcrypt from "bcrypt"

const router = Router();

router.get('/login', (req,res) => {
    res.send("get route for advocate login")
})

// router.post('/register', async (req,res) => {
//     try{
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         users.push({
//             id : Date.now().toString(),
//             name: req.body.name,
//             email: req.body.email,
//             password: hashedPassword
//         })
//         res.redirect("/login");
//     } catch {
//         res.redirect("/register")
//     }
//     console.log(users)
// })

export default router;