'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bookController = require('./../Controller/bookController');

var _bookController2 = _interopRequireDefault(_bookController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//Routers
router.route('/').get(_bookController2.default.show_All_Books).post(_bookController2.default.create_Book);

router.route('/update/:id').patch(_bookController2.default.update_UserIn_Book);

router.route('/:id').get(_bookController2.default.get_BookBy_Id).delete(_bookController2.default.delete_book_by_Id).patch(_bookController2.default.update_Book_by_ID);

module.exports = router;