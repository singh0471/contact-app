const express = require("express");
const userRouter = require("./user");
const InvalidError = require("../errors/invalidError.js");
const UnathorizedError = require("../errors/unathorizedError.js");
const NotFoundError = require("../errors/notFoundError.js");
const User = require("../components/user/service/user.js");
const cookieParser = require('cookie-parser');
const bcrypt = require("bcrypt");
const {Payload,verifyAdmin,verifyStaff} = require("../middleware/authorization.js");

const router = express.Router();
router.use(cookieParser());


router.post("/createAdmin", async (req,res,next) =>{
    try{
       const {firstName,lastName,username,password} = req.body;

        if(!firstName)
            throw new InvalidError("invalid first name");
        if(!lastName)
            throw new InvalidError("invalid last name");
        if(!username)
            throw new InvalidError("invalid username");
        if(!password)
            throw new InvalidError("invalid password");

        const admin =  await User.newAdmin(firstName,lastName,username,password);
        res.status(200).json(admin);
    }
    catch(error){
        next(error);
    }
})


router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;

        
        if (!username)
            throw new InvalidError("invalid username");
        if (!password)
            throw new InvalidError("invalid password");

        
        const user = await User.getUserByUsername(username);

        
        if (!user)
            throw new InvalidError("incorrect username entered.");

        
        if (await bcrypt.compare(password, user.getPassword())) {
            const payload = Payload.newPayload(user.getUserID(), user.getIsAdmin());
            const token = payload.signPayload();

           
            res.cookie("auth", `Bearer ${token}`);
            res.set("auth", `Bearer ${token}`);
            res.status(200).send(token);
        } else {
            res.status(403).json({ error: "incorrect password entered" });
        }
    } catch (error) {
        next(error);
    }
});




router.use("/user",userRouter);
module.exports = router;