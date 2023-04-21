const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:true,
        unique:true
    }
},{
    timestamps:true
})
const user = new mongoose.model('user',User);
module.exports =user