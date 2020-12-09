const express = require('express');
const jwt = require('jsonwebtoken');
const keys = require('./config/keys');
const statusCodes = require('./constants/statusCodes');
const router = express.Router();
const libraryController = require('./controllers/library-controller');
const userController = require('./controllers/user-controller');

router.use(function timeLog(req, res, next) {
    console.log(`Time: ${Date.now()} : Requests ${req.url}`);
    next();
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['token'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, keys.jwt.secretKey, (err, authData) => {
            if (!err) {
                req.authData = authData;
                next();
            } else {
                res.status(200).send({status: statusCodes.TOKEN_EXPIRED});
            }
        });
    } else {
        res.status(500).send({message: 'Please login / register to add, delete the data'});
    }
}

router.post('/signin', userController.signIn);
router.post('/signup', userController.signUp);
router.get('/book', libraryController.getAll);
router.get('/author', libraryController.getAll);
router.get('/publisher', libraryController.getAll);
router.get('/book/:id', libraryController.getById);
router.get('/author/:id', libraryController.getById);
router.get('/publisher/:id', libraryController.getById);
router.post('/author', verifyToken, libraryController.addItem);
router.post('/publisher', verifyToken, libraryController.addItem);
router.post('/book', verifyToken, libraryController.addItem);
router.delete('/author/:id', verifyToken, libraryController.deleteItem);
router.delete('/publisher/:id', verifyToken, libraryController.deleteItem);
router.delete('/book/:id', verifyToken, libraryController.deleteItem);

module.exports = router;