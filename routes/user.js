var express = require('express');
const utils = require('utility');

var router = express.Router();

var UserModel = require('../models/users');
var QuestionModel = require('../models/question');
var AnswerModel = require('../models/answer');

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
  var user = req.session.user;
  if (!user) {
    res.status(200).send({ message: 'Not Login' });
    return;
  }
  UserModel.findById(user._id).then((user) => {
    res.status(200).send({ success: true, user });
  });
});


// 注销 /logout
router.get('/logout', (req, res, next) => {
  req.session.user = null;
  res.status(200).send({success: true});
});

// 用户 pv
router.get('/pv/:id', (req, res, next) => {
  let {id} = req.params;
  // UserModel.incPv()
  if (id) {
    UserModel.incPv(id).then((result) => {
      if (result.ok) {
        res.status(200).send({success: true});
      } else {
        res.status(400).json({ message: 'error' });
      }
    })
    .catch((e) => {
      res.status(400).json({ message: 'error' });      
    });
  }
});

// 获取用户信息
router.get('/:id/userInfo', (req, res, next) => {
  let {id} = req.params;
  // UserModel.incPv()
  if (id) {
    Promise.all([
      UserModel.findById(id),
      UserModel.incPv(id),
    ]).then((result) => {
      console.log(result);
      let userinfo = result[0];
      res.status(200).send({success: true, userinfo});
    }).catch((e) => {
      res.status(400).json({ message: 'error' });
      next(e);
    });
  }
});

// 获取用户所有提问
router.get('/:id/logs',(req, res, next) => {
  let { id } = req.params;
  let { type } = req.query;
  switch (type) {
    case 'question':
      QuestionModel.getQuestionListByUserId(id)
        .then((result) => {
          res.status(200).send({ success: true, result });
        }).catch((e) => {
          res.status(400).json({ message: 'error' });
          next(e);
        });
      break;
    case 'answer':
      AnswerModel.getAnswerListByUserId(id)
        .then((result) => {
          res.status(200).send({success: true, result});
        }).catch((e) => {
          res.status(400).json({ message: 'error' });
          next(e);
        });
      break;
    case 'fans':
      UserModel.findFansById(id).then((result) => {
        res.status(200).send({success: true, result: result.fans});
      }).catch((e) => {
          res.status(400).json({ message: 'error' });
          next(e);
        })
      break;
    case 'follow':
      UserModel.findFollowsById(id).then((result) => {
        res.status(200).send({ success: true, result: result.follows });
      }).catch((e) => {
        res.status(400).json({ message: 'error' });
        next(e);
      })
      break;
    default:
      QuestionModel.getQuestionListByUserId(id)
        .then((result) => {
          res.status(200).send({ success: true, result });
        }).catch((e) => {
          res.status(400).json({ message: 'error' });
          next(e);
        });
  }
});

module.exports = router;