const Book = require('../Model/bookModel')
const User = require('../../user/model/userModel')

const show_All_Books = (req, res)=>{
    Book.find().populate("users", "name")
        .select("_id bookName genere authorName")
        .then(books=>{
            if(books<1){
                return res.status(404).json({
                    status:"Fail",
                    message:"There is no books in the library"
                })
            }
            res.status(200).json({
                status:"Success",
                message:"books fetched from the library",
                no_Of_Books:books.length,
                books
            })
        })
        .catch(err=>{
            res.status(400).json({
                status:"Fail",
                error:err
            })
        })
}

const create_Book = (req, res)=>{
    const book = new Book({
        bookName:req.body.bookName,
        genre:req.body.genre,
        authorName:req.body.authorName,
    })

    book.save()
        .then(doc=>{
            res.status(201).json({
                status:"Success",
                message:"book created",
                createdBook:{
                    bookName:doc.bookName,
                    _id:doc._id,
                    authorName:doc.authorName
                }
            })
        })
        .catch(err=>{
            res.status(400).json({
                status:"Fail",
                error:err
            })
        })
}

const get_BookBy_Id = (req, res)=>{
    Book.findById(req.params.id)
        .select("_id bookName genre authorName")
        .then(result=>{
            res.status(200).json({
                status:"Success",
                theBook:result
            })
        })
        .catch(err=>{
            res.status(400).json({
                status:"Fail",
                error:err
            })
        })
}

const delete_book_by_Id = (req, res)=>{
    Book.findByIdAndRemove(req.params.id).then(()=>{
        res.status(204).json({
            message:"book deleted successfully"
        })
    })
    .catch(err=>{
        res.status(400).json({
            status:"Fail",
            message:"book not deleted"
        })
    })
}

const update_Book_by_ID = (req, res)=>{
    Book.findByIdAndUpdate(req.params.id, req.body, {new:true})
        .then(doc=>{
            if(!doc){
                return res.status(404).json({
                    message:"document not found"
                })
            }
            res.status(200).json({
                status:"Success",
                updated_Document:doc
            })
        })
        .catch(err=>{
            res.status(400).json({
                status:"Fail",
                error:err
            })
        })
}

const update_UserIn_Book = async (req, res)=>{
    try{
        const needUpdateBookID = await Book.findById(req.params.id)
        let arrayField = needUpdateBookID.users
        arrayField.push(req.body.users)

        Book.findByIdAndUpdate(req.params.id, {users:arrayField}, {new:true})
            .then(updatedField=>{
                if(updatedField){
                    const userID = req.body.users
                    User.findById(userID)
                        .then(result=>{
                            let emptyBooksArr= result.books
                            emptyBooksArr.push(req.params.id)

                            User.findByIdAndUpdate(req.body.users, {books:emptyBooksArr}, {new:true})
                                .then(()=>{
                                    console.log("succesfully buyed books updated in user docs")
                                })
                            // console.log(result);
                        })
                }
                res.status(200).json({
                    status:"Updated",
                    updatedData:updatedField
                })
            })
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            status:"Fail",
            error:err
        })
    }
}

module.exports = {
    show_All_Books, create_Book, get_BookBy_Id, update_UserIn_Book, delete_book_by_Id, update_Book_by_ID
}