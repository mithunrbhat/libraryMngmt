const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const statusCodes = require('../constants/statusCodes');
const url = require('url');

const fileRW = require('../utils/fileReadWrite');

dataObj = {};
const filePath = 'mockUser.json'; 

(async function() {
    let jsonData = await fileRW.readFromFile(filePath);
    dataObj = JSON.parse(jsonData);
})();

async function signUp(req, res) {
    try {
        dataObj.users.push(req.body);
        await fileRW.writeIntoFile(filePath, dataObj)
    } catch (err) {
        res.status(500).send(err);
    }
}

async function signIn(req, res) {
    const {email ,password} = req.body;
    try {
        const user = dataObj.users.find((item) => {
            return item.email === email && item.password === password;
        });
        if(user) {
            jwt.sign({email, password}, keys.jwt.secretKey, {expiresIn: '1h'}, (err, token) =>{
                if(!err) {
                    res.status(200).send({token});
                } else {
                    res.status(401).send({status: statusCodes.TOKEN_EXPIRED});
                }
            });
        } else {
            res.status(401).send({message: 'Invalid credentials'});
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = {signIn, signUp};