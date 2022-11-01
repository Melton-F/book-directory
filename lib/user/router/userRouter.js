'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userController = require('./../controller/userController');

var _userController2 = _interopRequireDefault(_userController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//Routers
router.route('/').get(_userController2.default.show_All_Users).post(_userController2.default.create_User);

router.route('/:id').get(_userController2.default.get_User_By_Id).delete(_userController2.default.delete_user).patch(_userController2.default.update_user);

module.exports = router;