const CryptoJS = require('crypto-js');
const NodeRSA = require('node-rsa');
require('dotenv').config();

const Ballot = require('../models/ballot');
const Key = require('../models/key');
const { formatSuccess } = require('../lib/response');
const createError = require('../lib/error/errorFactory');
const commonError = require('../lib/error/commonError');

const rsaDecrypt = (text, key) => {
    try {
        const privateKey = new NodeRSA(key);
        const decrypt = privateKey.decrypt(text, 'utf8');
        return decrypt;
    } catch (err) {
        return '0';
    }
};

const aesEncrypt = (text, secretKey) => {
    const criperText = CryptoJS.AES.encrypt(text, secretKey).toString();
    return criperText;
};
const aesDecrypt = (text, secretKey) => {
    const bytes = CryptoJS.AES.decrypt(text, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
};

class BallotController {
    //[GET] '/ballot/:companyId'
    async votes(req, res, next) {
        try {
            const ballots = await Ballot.find({ company: req.params.companyId }).populate('voter');
            res.json(formatSuccess(ballots));
        } catch (err) {
            next(err);
        }
    }

    // [GET] /ballot/:companyId/:voterId/searchVote
    async searchVote(req, res, next) {
        try {
            const ballot = await Ballot.findOne({
                voter: req.params.voterId,
                company: req.params.companyId,
            });
            if (ballot) {
                res.json(formatSuccess({ id: ballot._id }));
            } else throw createError(commonError.INTERNAL_SERVER_ERROR);
        } catch (err) {
            next(err);
        }
    }

    //[GET] ballot/:companyId/numVoted/
    async numVoted(req, res, next) {
        try {
            const number = await Ballot.countDocuments({ company: req.params.companyId });
            res.json(formatSuccess({ number: number }));
        } catch (err) {
            next(err);
        }
    }

    //[POST] /ballot/:voterId/vote
    async vote(req, res, next) {
        try {
            //Mã hóa
            const criperText = aesEncrypt(
                JSON.stringify({
                    candidateIdList: req.body.candidateIdList,
                }),
                process.env.SECRET_KEY,
            );

            const ballot = await Ballot.create({
                voter: req.params.voterId,
                content: criperText,
                company: req.body.companyId,
            });
            res.json(formatSuccess(ballot));
        } catch (err) {
            next(err);
        }
    }

    // [POST] ballot/:id/decryptContent
    async decryptContent(req, res, next) {
        try {
            const ballot = await Ballot.findById(req.params.id);
            const key = await Key.findOne({
                company: ballot.company,
            });

            const secretKey = rsaDecrypt(key.dbSecretKey, req.body.privateKey);

            if (secretKey === process.env.SECRET_KEY) {
                const content = aesDecrypt(ballot.content, secretKey);
                res.json(formatSuccess({ content: JSON.parse(content), voterId: ballot.voter }));
            } else throw createError(commonError.INTERNAL_SERVER_ERROR, { message: 'Wrong privateKey!!' });
        } catch (err) {
            next(err);
        }
    }

    // [PATCH] /ballot//:id/updateIsCheck
    async updateIsCheck(req, res, next) {
        try {
            const ballot = await Ballot.findByIdAndUpdate(req.params.id, { isCheck: true });
            res.json(formatSuccess(ballot));
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new BallotController();
