"use strict";

var _userModel = require("./../model/userModel");

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var show_All_Users = function show_All_Users(req, res) {
    _userModel2.default.find().populate("books", "bookName").then(function (users) {
        if (users < 1) {
            return res.status(404).json({
                status: "Fail",
                message: "There is no users"
            });
        }
        res.status(200).json({
            status: "Success",
            message: "All the users showed",
            no_Of_Users: users.length,
            users: users
        });
    }).catch(function (err) {
        res.status(400).json({
            status: "Fail",
            error: err
        });
    });
};

var create_User = function create_User(req, res) {
    var user = new _userModel2.default({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email
    });

    user.save().then(function (doc) {
        res.status(201).json({
            status: "Success",
            message: "user created",
            createdUser: doc
        });
    }).catch(function (err) {
        res.status(400).json({
            status: "Fail",
            error: err
        });
    });
};

var get_User_By_Id = function get_User_By_Id(req, res) {
    _userModel2.default.findById(req.params.id).then(function (user) {
        if (!user) {
            res.status(404).json({
                status: "Fail",
                message: "User not Found"
            });
        }
        res.status(200).json({
            status: "Success",
            user: user
        });
    }).catch(function (err) {
        res.status(400).json({
            status: "Fail",
            error: err
        });
    });
};

var update_user = function update_user(req, res) {
    _userModel2.default.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(function (doc) {
        res.status(200).json({
            status: "Success",
            message: "user updated",
            updatedUser: doc
        });
    }).catch(function (err) {
        res.status(400).json({
            status: "fail",
            error: err
        });
    });
};

var delete_user = function delete_user(req, res) {
    _userModel2.default.deleteOne({ _id: req.params.id }).exec().then(function (result) {
        res.status(204).json({
            status: "Success",
            message: "user deleted successfully"
        });
    }).catch(function (err) {
        res.status(400).json({
            status: "Fail",
            error: err
        });
    });
};

module.exports = {
    show_All_Users: show_All_Users, create_User: create_User, get_User_By_Id: get_User_By_Id, delete_user: delete_user, update_user: update_user
};