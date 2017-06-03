var express = require('express');
const utils = require('utility');

var router = express.Router();

var UserModel = require('../models/users');

// 注册 /signup
router.post('/signup', function(req, res, next) {
  var { username, password, email, confirm } = req.body;
  console.log(req.body);
  password = utils.md5(password);
  console.info("ysuo",password);

  var user = {
    username: username,
    password: password,
    email:email
  };

  UserModel.save(user)
    .then(function(result) {
      console.log('sigunup.js     ', result);
      delete user.password;
      req.session.user = user;
      res.status(200).json({ message: 'Ok', success: true, user });
    })
    .catch(function(e) {
      res.status(400).json({ message: 'error' });
      next(e);
    });
});


// 登录 /signin
router.post('/signin', (req, res, next) => {
  var { username, password } = req.body;

  UserModel.findOne({username})
    .then(user => {
      console.log(user);
      if (!user) {
        res.status(400).json({error: '用户不存在'});
      }
      if (utils.md5(password) === user.password) {
        delete user.password;
        req.session.user = user;
        res.status(200).json({ success: true, message: 'Ok', user });
      } else {
        res.status(400).json({ error: '密码错误'});
      }
    });

});


// 用户信息 /userInfo
router.get('/userInfo', (req, res, next) => {
  console.log("====", req.session)
  var user = req.session.user;
  if (!user) {
    res.status(200).send({ message: 'Not Login' });    
    return;
  }
  res.status(200).send({success: true, user});
});


// 注销 /logout
router.get('/logout', (req, res, next) => {
  req.session.user = null;
  res.status(200).send({success: true});
});

module.exports = router;