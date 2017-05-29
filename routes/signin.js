var express = require('express');
const utils = require('utility');

var router = express.Router();

var UserModel = require('../models/users');

router.post('/', (req, res, next) => {
  var { username, password } = req.body;

  UserModel,findOne({username})
    .then(user => {
      if (!user) {
        res.status(400).json({error: '用户不存在'});
      }
      if (utils.md5(password) === user.password) {
        delete user.password;
        req.session.user = user;
        res.status(200).json({ success: true, message: 'Ok' });
      }
    });

});

module.exports = router;