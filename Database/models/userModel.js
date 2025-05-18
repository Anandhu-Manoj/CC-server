const mongoose=require('mongoose')
const { any } = require('../../Middleware/multerMiddleWare')
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
        
    },
    userType:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
    },
    adhaarImg:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true,
    },
    aadharNo:{
        type:Number,
        required:true,
        unique:true
    },
    Notification:{
        type:Array
    }
})

const users=mongoose.model('users',userSchema)
module.exports=users