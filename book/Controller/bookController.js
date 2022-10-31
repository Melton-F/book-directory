const Book = require('../Model/bookModel')

const show_All_Books = (req, res)=>{
    Book.find()
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
                createdBook:doc
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
            res.staus(400).json({
                staus:"Fail",
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
    show_All_Books, create_Book, get_BookBy_Id, update_UserIn_Book
}