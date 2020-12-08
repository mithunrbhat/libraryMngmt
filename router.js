const express = require('express');
const router = express.Router();
const libraryController = require('./controllers/library-controller');

router.get('/book', libraryController.getAll);
router.get('/author', libraryController.getAll);
router.get('/publisher', libraryController.getAll);
router.get('/book/:id', libraryController.getById);
router.get('/author/:id', libraryController.getById);
router.get('/publisher/:id', libraryController.getById);
router.post('/author', libraryController.addItem);
router.post('/publisher', libraryController.addItem);
router.post('/book', libraryController.addItem);
router.delete('/author/:id', libraryController.deleteItem);
router.delete('/publisher/:id', libraryController.deleteItem);
router.delete('/book/:id', libraryController.deleteItem);





module.exports = router;