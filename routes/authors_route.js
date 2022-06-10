import dotenv from 'dotenv'
import authorController from '../controllers/authors_controller'

const express = require('express')
const router = express.Router();

dotenv.config();

router.get('/', authorController.all);
router.post('/', authorController.create);
router
    .route('/:id')
    .get(authorController.getAuthor)
    .patch(authorController.update)
    .delete(authorController.remove);

module.exports = router;