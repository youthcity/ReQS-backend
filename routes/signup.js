// 注册
var fs = require('fs');
var path = require('path');
// var sha1 = require('sha1');
var express = require('express');
var router = express.Router();
const utils = require('utility');

var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signup 注册


router.get('/', checkNotLogin, function(req, res, next) {
  res.render('signup');
});

// POST /signup 用户注册
router.post('/', function(req, res, next) {
  var { username, password, email, confirm } = req.body;
  console.log(req.body);
  // try {
  //   if (!(name.length >= 1 && name.length <= 10)) {
  //     throw new Error('名字请限制在 1-10 个字符')
  //   }
  //   if (['m', 'f', 'x'].indexOf(gender) === -1) {
  //     throw new Error('性别只能是 m、f 或 x');
  //   }
  //   if (!req.files.avatar.name) {
  //     throw new Error('缺少头像');
  //   }
  //   if (password.length < 6) {
  //     throw new Error('密码至少 6 个字符');
  //   }
  //   if (password !== repassword) {
  //     throw new Error('两次输入密码不一致');
  //   }
  // } catch(e) {
  //   fs.unlink(req.files.avatar.path);
  //   req.flash('error', e.message);
  //   return res.redirect('/signup');
  // }

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

module.exports = router;
