const { default: mongoose } = require("mongoose");

const TODO = new mongoose.Schema({
    user:{
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    task:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    }
})

const todo = mongoose.model('todo',TODO);
module.exports = todo;
