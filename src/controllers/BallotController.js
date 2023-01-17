const Ballot = require('../models/ballot');
const Key = require('../models/key');
const CryptoJS = require('crypto-js');

const NodeRSA = require('node-rsa');
require('dotenv').config();

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
            res.json({
                status: 'success',
                data: ballots,
            });
        } catch (err) {
            res.status(500).json(err.message);
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
            res.json({
                status: 'success',
                data: ballot,
            });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    async searchVote(req, res, next) {
        try {
            const ballot = await Ballot.findOne({
                voter: req.params.voterId,
                company: req.params.companyId,
            });
            if (ballot) {
                res.json({
                    status: 'success',
                    data: {
                        id: ballot._id,
                    },
                });
            } else {
                res.json({
                    status: 'error',
                    data: null,
                });
            }
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    async numVoted(req, res, next) {
        try {
            const number = await Ballot.countDocuments({ company: req.params.companyId });
            res.json({
                status: 'success',
                data: {
                    number: number,
                },
            });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    async decryptContent(req, res, next) {
        try {
            const ballot = await Ballot.findById(req.params.id);
            const key = await Key.findOne({
                company: ballot.company,
            });

            const secretKey = rsaDecrypt(key.dbSecretKey, req.body.privateKey); ///đứng

            if (secretKey === process.env.SECRET_KEY) {
                const content = aesDecrypt(ballot.content, secretKey);
                res.json({
                    status: 'success',
                    data: {
                        content: JSON.parse(content),
                        voterId: ballot.voter
                    },
                });
            } else {
                res.json({
                    status: 'error',
                    message: 'Wrong key!!',
                    data: null,
                });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json(err.message);
        }
    }

    async updateIsCheck(req, res, next) {
        try {
            const ballot = await Ballot.findByIdAndUpdate(req.params.id, {
                isCheck: true,
            });
            res.json({
                status: 'success',
                data: {
                    ballot,
                },
            });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
}

module.exports = new BallotController();
