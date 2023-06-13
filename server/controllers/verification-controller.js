const jwt = require("jsonwebtoken")
const User = require("../models/User")

class VerificationContoller {
    async verifyToken(req,res){
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:"No token, authorization denied"})
        }
        try{
            const decoded = jwt.verify(token,process.env.SIGN)
            const user = await User.findById(decoded.id);
            if(user)
            {
                res.status(200).json({message:"Verified User"})
            }else
            {
                res.status(400).json({message:"User not found"})
            }
        }
        catch(error)
        {
            res.status(401).json({message:"please authenticate vadild token"})
        }
    }
}

module.exports=new VerificationContoller();