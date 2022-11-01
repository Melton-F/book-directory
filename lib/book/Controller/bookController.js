'use strict';

var _bookModel = require('./../Model/bookModel');

var _bookModel2 = _interopRequireDefault(_bookModel);

var _userModel = require('./../../user/model/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var show_All_Books = function show_All_Books(req, res) {
  _bookModel2.default.find().populate("users", "name").select("_id bookName genere authorName").then(function (books) {
    if (books < 1) {
      return res.status(404).json({
        status: "Fail",
        message: "There is no books in the library"
      });
    }
    res.status(200).json({
      status: "Success",
      message: "books fetched from the library",
      no_Of_Books: books.length,
      books: books
    });
  }).catch(function (err) {
    res.status(400).json({
      status: "Fail",
      error: err
    });
  });
};

var create_Book = function create_Book(req, res) {
  var book = new _bookModel2.default({
    bookName: req.body.bookName,
    genre: req.body.genre,
    authorName: req.body.authorName
  });

  book.save().then(function (doc) {
    res.status(201).json({
      status: "Success",
      message: "book created",
      createdBook: {
        bookName: doc.bookName,
        _id: doc._id,
        authorName: doc.authorName
      }
    });
  }).catch(function (err) {
    res.status(400).json({
      status: "Fail",
      error: err
    });
  });
};

var get_BookBy_Id = function get_BookBy_Id(req, res) {
  _bookModel2.default.findById(req.params.id).populate("users", "name").select("_id bookName genre authorName").then(function (result) {
    res.status(200).json({
      status: "Success",
      theBook: result
    });
  }).catch(function (err) {
    res.status(400).json({
      status: "Fail",
      error: err
    });
  });
};

var delete_book_by_Id = function delete_book_by_Id(req, res) {
  _bookModel2.default.findByIdAndRemove(req.params.id).then(function () {
    res.status(204).json({
      message: "book deleted successfully"
    });
  }).catch(function (err) {
    res.status(400).json({
      status: "Fail",
      message: "book not deleted"
    });
  });
};

var update_Book_by_ID = function update_Book_by_ID(req, res) {
  _bookModel2.default.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(function (doc) {
    if (!doc) {
      return res.status(404).json({
        message: "document not found"
      });
    }
    res.status(200).json({
      status: "Success",
      updated_Document: doc
    });
  }).catch(function (err) {
    res.status(400).json({
      status: "Fail",
      error: err
    });
  });
};

var update_UserIn_Book = async function update_UserIn_Book(req, res) {
  try {
    var needUpdateBookID = await _bookModel2.default.findById(req.params.id);
    var arrayField = needUpdateBookID.users;
    arrayField.push(req.body.users);

    //updating book field
    _bookModel2.default.findByIdAndUpdate(req.params.id, { users: arrayField }, { new: true }).then(function (updatedField) {
      if (updatedField) {
        var userID = req.body.users;
        _userModel2.default.findById(userID).then(function (result) {
          var emptyBooksArr = result.books;
          emptyBooksArr.push(req.params.id);

          //updating user field
          _userModel2.default.findByIdAndUpdate(req.body.users, { books: emptyBooksArr }, { new: true }).then(function () {
            console.log("succesfully buyed books updated in user docs");
          }).catch(function (err) {
            console.log("not yet updated");
          });
          // console.log(result);
        });
      }
      res.status(200).json({
        status: "Updated",
        updatedData: updatedField
      });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "Fail",
      error: err
    });
  }
};

module.exports = {
  show_All_Books: show_All_Books,
  create_Book: create_Book,
  get_BookBy_Id: get_BookBy_Id,
  update_UserIn_Book: update_UserIn_Book,
  delete_book_by_Id: delete_book_by_Id,
  update_Book_by_ID: update_Book_by_ID
};