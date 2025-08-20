const {Schema,model} = require ('mongoose')



const userSchema = new Schema (
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
            trim:true
        },
        email:{
              type:String,
            required:true,
            trim:true,
            unique:true
        },
        role:{
            type:String,
            enum:["admin","user","superadmin"],
            default:"user"
        },
        avatar: { type: String }
    },{timestamps:true}
)


const upload = new model ("userTest",userSchema)


module.exports = upload