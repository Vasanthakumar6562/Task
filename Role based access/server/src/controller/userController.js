const { generateToken } = require("../middleware/authMiddleware");
const User = require("../model/user")
const bcrypt = require ("bcryptjs")
const register = async (req,res) => {
try {
    const {name,email,password,role} = req.body;
//    console.log(req.body)
    const checkUser = await User.findOne({email});
 
    if(checkUser) return res.status(400).send({ message: "Email already exists" });

    const hashPassword = await bcrypt.hash(password,10)

    const user = new User ({
        name,
        email,
        role,
        password:hashPassword
    })

    await user.save();

     res.status(201).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: "user",
    });
} catch (error) {
     console.error("Register error:", error.message);
    res.status(500).send({ message: "Server error" });
}
}


const login = async(req,res) =>{
    try {
        const {email,password} = req.body;
        
        const user = await User.findOne({email})
        if(!user)  return res.status(400).send({ message: "Invalid Credentials" });

        const checkPassword = await bcrypt.compare(password,user.password)
        if(!checkPassword) return res.status(400).send({ message: "Invalid Credentials" });

        const token = generateToken(user._id)
         console.log(token);



         res.status(200).json({
            token,
            user:{
                name:user.name,
                email:user.email,
                role:user.role
            }
         })
    } catch (error) {
        console.error("Register error:", error.message);
    res.status(500).send({ message: "Server error" });
    }
}


module.exports = {register,login}