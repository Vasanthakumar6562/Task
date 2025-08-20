

const roleCheck = (roles) => {
   return(req,res,next)=>{
    if(!roles.includes(req.user.role)){
      return  res.json("Access denied: insufficient role")
    }
    next()
   }
}



module.exports = {roleCheck}