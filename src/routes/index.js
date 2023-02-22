const voterRouter = require('./voter');
const siteRouter = require('./site');
const companyRouter = require('./company');
const candidateRouter = require('./candidate');
const electionRouter = require('./election');
const keyRouter = require('./key');
const ballotRouter = require('./ballot');
const {notFound ,errorHandler} = require('../middleware/ErrorHandler');

function routes(app) {
    app.use('/api/voter', voterRouter);
    app.use('/api/company', companyRouter);
    app.use('/api/candidate', candidateRouter);
    app.use('/api/election', electionRouter);
    app.use('/api/key', keyRouter);
    app.use('/api/ballot', ballotRouter);
    app.use('/', siteRouter);
    app.use(notFound);
    app.use(errorHandler);
}

module.exports = routes;
