module.exports = {
  checkLogin: function (req, res, next) {
    if (!req.session.user) {
      console.log('未登录');
      // return res.redirect('/signin');
    }
    next();
  },
  checkNotLogin: function (req, res, next) {
    if (req.session.user) {
      console.log('已登录');
      // req.flash('error', '已登录');
      // return res.redirect('back');
    }
    next();
  }
};