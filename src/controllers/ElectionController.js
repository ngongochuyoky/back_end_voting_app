const Election = require('../models/election');

class ElectionController {
    // [GET] '/election/:companyId/voterList'
    async voterList(req, res, next) {
        try {
            const election = await Election.findOne({ company: req.params.companyId }).populate('voters');
            res.json({
                status: 'success',
                data: election.voters,
            });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    //[GET] '/election/:voterId/searchByVoterId'
    async searchByVoterId(req, res, next) {
        try {
            const elections = await Election.find({ voters: req.params.voterId }).populate('company');
            res.json({
                status: 'success',
                data: elections,
            });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

     //[GET] '/election/:voterId/searchByCompanyId'
     async searchByCompanyId(req, res, next) {
        try {
            const election = await Election.findOne({ company: req.params.companyId });
            res.json({
                status: 'success',
                data: election,
            });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

     //[GET] '/election/:voterId/searchByCompanyId'
     async searchByElectionAddress(req, res, next) {
        try {
            const election = await Election.findOne({ election_address: req.params.electionAddress });
            res.json({
                status: 'success',
                data: election,
            });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    //[POST] '/election/create'
    async create(req, res, next) {
        try {
            
                const election = await Election.create({
                    company: req.body.companyId,
                    election_address: req.body.electionAddress,
                });
                res.json({
                    status: 'success',
                    data: election,
                });
            
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    //[PATCH] '/election/:companyId/updateVoters'

    async updateVoters(req, res, next) {
        try {
            const election = await Election.findOneAndUpdate(
                { company: req.params.companyId },
                { voters: req.body.voters },
            );
            res.json({
                status: 'success',
                data: election,
            });
        } catch (err) {
            res.status(500).json(err.message);
        }
    }

    async updateTimeStart(req, res, next) {
        console.log('time:::::',req.body.timeOut)
        try{
            const election = await Election.findOneAndUpdate(
                { company: req.params.companyId},{
                    startTime: Date.now(),
                    time: new Date(req.body.timeOut)
                }
            );
            res.json({
                status: 'success',
                data: election
            })
        }catch(err) {
            res.status(500).json(err.message)
        }
    }
   
}

module.exports = new ElectionController();
