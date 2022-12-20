const voterRouter = require('./voter');
const siteRouter = require('./site');
const companyRouter = require('./company');
const candidateRouter = require('./candidate');

function routes(app) {
  app.use('/voter', voterRouter);
  app.use('/company', companyRouter);
  app.use('/candidate', candidateRouter);
  app.use('/', siteRouter);

}

module.exports = routes;
