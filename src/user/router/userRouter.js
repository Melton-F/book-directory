import express from'express'
import userController from './../controller/userController'
const router = express.Router()


//Routers
router.route('/')
    .get(userController.show_All_Users)
    .post(userController.create_User)

router.route('/:id')
    .get(userController.get_User_By_Id)
    .delete(userController.delete_user)
    .patch(userController.update_user)

module.exports = router