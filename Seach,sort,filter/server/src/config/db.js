const mongoose = require('mongoose')



const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URL)
        .then(()=>console.log("MongoDB Connected"))
    } catch (error) {
        console.log(error)
    }
}


module.exports = connectDB