"use strict";

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bookSchema = new _mongoose2.default.Schema({
    bookName: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    users: [{
        type: _mongoose2.default.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { Timestamp: true }, { versionKey: false });

var Book = _mongoose2.default.model('Book', bookSchema);
module.exports = Book;