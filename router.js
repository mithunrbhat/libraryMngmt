const express = require('express');
const router = express.Router();
const libraryController = require('./controllers/library-controller');

router.get('/book', libraryController.getAll);
router.get('/book/:id', libraryController.getById);
router.get('/author/:id', libraryController.getAll);
router.get('/publisher/:id', libraryController.getAll);
router.post('/author', libraryController.getAll);
router.post('/publisher', libraryController.getAll);
router.post('/book', libraryController.getAll);
router.delete('/author/:id', libraryController.getAll);
router.delete('/publisher/:id', libraryController.getAll);
router.delete('/book/:id', libraryController.getAll);





module.exports = router;