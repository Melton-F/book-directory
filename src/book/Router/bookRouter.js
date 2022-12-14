import express from 'express'
import bookController from './../Controller/bookController'
const router = express.Router()

//Routers
router.route('/')
    .get(bookController.show_All_Books)
    .post(bookController.create_Book)

router.route('/update/:id').patch(bookController.update_UserIn_Book)

router.route('/:id')
    .get(bookController.get_BookBy_Id)
    .delete(bookController.delete_book_by_Id)
    .patch(bookController.update_Book_by_ID)

module.exports = router