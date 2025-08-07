const mongoose = require("mongoose")

const ConnectDB = ()=>{
   try {
        mongoose.connect(process.env.MONGO_URI)
        .then(console.log("MongoDb Connected Successfully"))
    } catch (error) {
        console.log("error",error);
        
    }
}


module.exports = ConnectDB;