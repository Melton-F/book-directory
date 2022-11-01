import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    books:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
    }]
}, {versionKey:false})

const User = mongoose.model('User', userSchema) 
module.exports = User