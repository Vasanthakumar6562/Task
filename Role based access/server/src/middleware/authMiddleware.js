const User = require("../model/user")
const jwt = require("jsonwebtoken")

const generateToken = (id) => {
     return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "10d" });
}


const protect = async (req,res,next) => {

    if(
        req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ){
        try {
        
            const token = req.headers.authorization.split(" ") [1]
            console.log(token);

            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password");
            next();
            
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
    }
}



const roleMiddleware =(role) =>{
    return (req,res,next) => {
        if(req.user.role !=="role"){
            return res.status(403).json({ message: "Access denied" });
        }
        next()
    }

}


module.exports = {
    generateToken,
    protect,
    roleMiddleware
}