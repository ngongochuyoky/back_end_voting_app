const Election = require('../models/election');
const { formatSuccess } = require('../lib/response');


class ElectionController {
    // [GET] '/election/:companyId/voterList'
    async voterList(req, res, next) {
        try {
            const election = await Election.findOne({ company: req.params.companyId }).populate('voters');
            res.json(formatSuccess(election.voters));
        } catch (err) {
            next(err);
        }
    }

    //[GET] '/election/:voterId/searchByVoterId'
    async searchByVoterId(req, res, next) {
        try {
            const elections = await Election.find({ voters: req.params.voterId }).populate('company');
            res.json(formatSuccess(elections));
        } catch (err) {
            next(err);
        }
    }

    //[GET] '/election/:companyId/searchElection'
    async searchElection(req, res, next) {
        try {
            const election = await Election.findOne({ company: req.params.companyId });
            res.json(formatSuccess(election));
        } catch (err) {
            next(err);
        }
    }

    //[GET] '/election/:voterId/searchByCompanyId'
    async searchByElectionAddress(req, res, next) {
        try {
            const election = await Election.findOne({ election_address: req.params.electionAddress });
            res.json(formatSuccess(election));
        } catch (err) {
            next(err);
        }
    }

    //[POST] '/election/create'
    async create(req, res, next) {
        try {
            const election = await Election.create({
                company: req.body.companyId,
                election_address: req.body.electionAddress,
            });
            res.json(formatSuccess(election));
        } catch (err) {
            next(err);
        }
    }

    //[PATCH] '/election/:companyId/updateVoters'

    async updateVoters(req, res, next) {
        try {
            const election = await Election.findOneAndUpdate(
                { company: req.params.companyId },
                { voters: req.body.voters },
            );
            res.json(formatSuccess(election));
        } catch (err) {
            next(err);
        }
    }

    // [PATCH]  '/api/election/:companyId/updateTimeStart
    async updateTimeStart(req, res, next) {
        try {
            const election = await Election.findOneAndUpdate(
                { company: req.params.companyId },
                {
                    startTime: Date.now(),
                    time: new Date(req.body.timeOut),
                },
            );
            res.json(formatSuccess(election));
        } catch (err) {
            next(err);
        }
    }
}

module.exports = new ElectionController();
