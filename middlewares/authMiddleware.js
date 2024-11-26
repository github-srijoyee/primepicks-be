const User=require("../models/userModel");
const jwt=require("jsonwebtoken");
const asyncHandler=require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded?.id);

                if (!user) {
                    res.status(401);
                    throw new Error("User not found. Please log in again.");
                }

                req.user = user;
                next();
            }
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                res.status(401);
                throw new Error("Not authorized, token expired. Please log in again.");
            } else {
                res.status(401);
                throw new Error(error.name);
            }
        }
    } else {
        res.status(401);
        throw new Error("No token attached to header.");
    }
});

const isAdmin=asyncHandler(async(req,res,next)=>{
    const {email}=req.user;
    const adminUser=await User.findOne({email});
    if(adminUser.role!=="admin"){
throw new Error("You are not an admin");

    }else{
        next();
    }
    
})
module.exports={authMiddleware,isAdmin};