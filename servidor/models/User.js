const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    dni:{
        type:String,
        required:true,
        trim:true
    },
    birthday:{
        type:Date,
        required:true,
        trim:true
    },
    created_at:{
        type:Date,
        default:Date.now()
    },
    updated_at:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model('User',UserSchema)