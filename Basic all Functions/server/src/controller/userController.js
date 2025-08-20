const { genegerateToken } = require("../middileware/auth");
const User = require("../model/user")
const bcrypt = require ('bcryptjs')



const Register = async (req,res) =>{
    try {
        const {name,password,email,role} = req.body;

        const checkUser = await User.findOne({email});
        if(checkUser) return res.json("email already registered")
        
            const hashpassword = await bcrypt.hash(password,10);

            const newUser = await User({
                name,
                email,
                password:hashpassword,
                role
            })

            await newUser.save();

            res.json("User Registered done")

    } catch (error) {
        console.log(error)
        res.json(error)
    }
}


const login = async (req,res) => {

    try {
        const {email,password} = req.body;

    const checkEmail = await User.findOne({email});
    if(!checkEmail) return res.json("invalid credentials")

        const checkPassword = await bcrypt.compare(password,checkEmail.password)
        if(!checkPassword) return res.json("invalid credentials")

        const token = genegerateToken(checkEmail) 

        res.json({
            token,
            data:{
                email:checkEmail.email,
                name:checkEmail.name,
                role:checkEmail.role
            }
        })
    } catch (error) {
        console.log(error)
        res.json(error)
    }

}




// Get own profile (/me)
const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update own profile (/me/update)
const updateMyProfile = async (req, res) => {
  try {
    const { name, password } = req.body;
    const updateFields = {};

    if (name) updateFields.name = name;
    if (password) updateFields.password = await bcrypt.hash(password, 10);
    if (req.file) updateFields.avatar = req.file.path; // multer adds this

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




module.exports = {Register,login,getMyProfile,updateMyProfile}