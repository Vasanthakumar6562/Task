const mongoose = require ('mongoose')


const connectionDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        .then(console.log("MongoDB Connected Successfully"))
    } catch (error) {
        console.log("MongoDB error :",error);
        
    } 
}


module.exports = connectionDB;