import dotenv from 'dotenv'
import booksController from '../controllers/books_controller'

const express = require('express')
const router = express.Router();

dotenv.config();

router.get('/', booksController.all);
router.post('/', booksController.create);
router
    .route('/:id')
    .get(booksController.getBook)
    .patch(booksController.update)
    .delete(booksController.remove);

module.exports = router;