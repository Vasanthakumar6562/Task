
const jwt = require('jsonwebtoken')

const genegerateToken =  (user) =>{
     
    const token = jwt.sign({id:user._id,role:user.role},process.env.SECRETKEY,{expiresIn:"2h"})

    return token;
}


const verifyToken = async(req,res,next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if(!token) return res.json("no token provided,Access denied....");

        const decoded = jwt.verify(token,process.env.SECRETKEY);
        req.user = decoded;
        next(); 
    } catch (error) {
        console.log(error)
        res.json(error)
    }
}


module.exports = {
    genegerateToken,
    verifyToken
}