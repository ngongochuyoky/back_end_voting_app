const voterRouter = require('./voter');
const siteRouter = require('./site');
const companyRouter = require('./company');
const candidateRouter = require('./candidate');

function routes(app) {
  app.use('/api/voter', voterRouter);
  app.use('/api/company', companyRouter);
  app.use('/api/candidate', candidateRouter);
  app.use('/', siteRouter);

}

module.exports = routes;
