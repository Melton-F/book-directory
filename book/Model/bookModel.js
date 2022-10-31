const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    bookName:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    authorName:{
        type:String,
        required:true
    },
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }]
})

const Book = mongoose.model('Book', bookSchema) 
module.exports = Book