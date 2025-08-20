const bcrypt = require('bcryptjs')
const User = require ('./src/model/user')


const superadminCreation = async(req,res)=>{
    try {
        const checkUser = await User.findOne({role:"superadmin"})
        if(!checkUser) {
            const hashpassword = await bcrypt.hash("Superadmin123",10);
            const newSuperAdmin =  await User({
                name:"Super Admin",
                role:"superadmin",
                email:"superadmin@gmail.com",
                password:hashpassword
            })

            await newSuperAdmin.save();
            console.log("super admin creation done");
            
        }
    } catch (error) {
          console.log(error)
       
    }
}

module.exports = superadminCreation