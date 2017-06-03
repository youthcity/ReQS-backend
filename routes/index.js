
// var index = require('./routes/index');
// var users = require('./routes/users');

module.exports = function (app) {
  app.get('/', function (req, res) {
    if (req.session.isVisit) {
      req.session.isVisit++;
      res.send('<p>第 ' + req.session.isVisit + '次来此页面</p>');
    } else {
      req.session.isVisit = 1;
      res.send("欢迎第一次来这里");
      console.log(req.session);
    }
    res.render('index', { title: 'ReQS' });
    return;
  });
  app.use('/user', require('./user'));
  app.use('/tags', require('./tags'));
  app.use('/question', require('./question'));
  // app.use('/signup', require('./signup'));
  // app.use('/signin', require('./signin'));
  // app.use('/signout', require('./signout'));
  // app.use('/question', require('./posts'));
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.status(404).render('404');
    }
  });
}