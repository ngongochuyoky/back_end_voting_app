const Key = require('../models/key');
require('dotenv').config();
const saltRounds = 10;
const bcrypt = require('bcrypt');
const NodeRSA = require('node-rsa');

const rsaKeys = () => {
    const keys = new NodeRSA({ b: 1024 });
    const publicKey = keys.exportKey('public');
    const privateKey = keys.exportKey('private');
    return { publicKey, privateKey };
};

const rsaEncrypt = (text, key) => {
    const publicKey = new NodeRSA(key);
    const encrypted = publicKey.encrypt(text, 'base64');
    return encrypted;
};


class KeyController {
    //[GET] /key/:companyId/keys
    async rsaKeys(req, res, next) {
        try {
            const rsa = rsaKeys();
            const c = bcrypt.hashSync(rsa.privateKey.toString(), 10);
            console.log(typeof rsa.privateKey)
            console.log('c-------', c);
            const b = bcrypt.compareSync(rsa.privateKey, c);
            console.log('b-----',b)
            const dbSecretKey = rsaEncrypt(process.env.SECRET_KEY, rsa.publicKey);
            await Key.create({
                company: req.params.companyId,
                hashPrivateKey: bcrypt.hashSync(rsa.privateKey.toString(), 10),
                publicKey: rsa.publicKey,
                dbSecretKey: dbSecretKey,
            });
            res.json({
                status: 'success',
                data: {
                    privateKey: rsa.privateKey,
                },
            });
        } catch (err) {
            console.log(err.message)
            res.status(500).json(err.message);
        }
    }

    //[GET] /key/:companyId/hashSignature
    async hashSignature(req, res, next) {
        try {
            const key = await Key.findOne({
                company: req.params.companyId,
            });
            res.json({
                status: 'success',
                data: {
                    hashSignature: key.hashPrivateKey,
                },
            });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
}

module.exports = new KeyController();
