const Key = require('../models/key');
require('dotenv').config();
const bcrypt = require('bcrypt');
const NodeRSA = require('node-rsa');
const { formatSuccess } = require('../lib/response');

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
            const dbSecretKey = rsaEncrypt(process.env.SECRET_KEY, rsa.publicKey);
            await Key.create({
                company: req.params.companyId,
                hashPrivateKey: bcrypt.hashSync(rsa.privateKey.toString(), 10),
                publicKey: rsa.publicKey,
                dbSecretKey: dbSecretKey,
            });
            res.json(formatSuccess({ privateKey: rsa.privateKey }));
        } catch (err) {
            next(err);
        }
    }

    //[GET] /key/:companyId/hashSignature
    async hashSignature(req, res, next) {
        try {
            const key = await Key.findOne({
                company: req.params.companyId,
            });
            res.json(formatSuccess({ hashSignature: key.hashPrivateKey }));
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new KeyController();
