


const userSide = async(req,res) => {
    return res.json("user Dashboard")
}

const adminSide = async(req,res) => {
    return res.json("admin Dashboard")
}


const superadminSide = async(req,res) => {
    return res.json("user Dashboard")
}





module.exports={
    userSide,
    adminSide,
    superadminSide
}