const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

//Routers
router.route('/')
    .get(userController.show_All_Users)
    .post(userController.create_User)

module.exports = router