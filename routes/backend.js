const utils = require('utility');
var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');
var AnswerModel = require('../models/answer');
var QuestionModel = require('../models/question');
var TagModel = require('../models/tags');

// 登录
router.post('/user/login', (req, res, next) => {
  const { username, password } = req.body;

  UserModel.findOne({username})
    .then(user => {
      console.log(user);
      if (!user || user.typeId !== 1) {
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

// 注销
router.get('/user/logout', (req, res, next) => {
  req.session.user = null;
  res.status(200).send({success: true});
});

// 用户信息
router.get('/userInfo', (req, res, next) => {
  var user = req.session.user;
  if (!user) {
    res.status(200).send({ message: 'Not Login' });
    return;
  }
  user.permissions = [
    'dashboard', 'users', 'tags', 'questions',
  ];
  res.status(200).send({ success: true, user });

}); 

// 面板信息
router.get('/dashboard', (req, res, next) => {
  Promise.all([
    UserModel.getTotalUsers(),
    QuestionModel.getTotalQuestion(),
    AnswerModel.getTotalAnswers(),
    TagModel.getTotalTags(),
  ]).then((result) => {
    const numbers = [
      {
        icon: 'user-add',
        color: '#64ea91',
        title: '注册用户数',
        number: result[0],
      }, {
        icon: 'question-circle-o',
        color: '#8fc9fb',
        title: '提问总数',
        number: result[1],
      }, {
        icon: 'message',
        color: '#d897eb',
        title: '回答总数',
        number: result[2],
      }, {
        icon: 'tag',
        color: '#f69899',
        title: '话题总数',
        number: result[3],
      },
    ];
    const quote = {
      name: '小南门有限公司',
      title: '【放假通知】',
      content: '端午假期连休4天，好好陪陪家人和放松一下啦^-^  5月27号-5月30号放假，5月31号正常上班。 另外，6月3号周六上班。',
      avatar: 'http://opbc041f6.bkt.clouddn.com/sf/logo/cute_avatar.jpg',
    }

    res.status(200).send({ success: true, result: {
      numbers,
      quote,
    } });
    
  });
});

// 获取所有用户
router.get('/users', (req, res, next) => {
  UserModel.find()
    .then((result) => {
      res.status(200).json({ message: 'Ok', success: true, result });
    })
    .catch((e) => {
      res.status(400).json({ message: 'error' });
      next(e);
    });
});

// 话题
router.route('/tags').get((req, res, next) => {
  TagModel.find()
  .then((tags) => {
    res.status(200).json({ message: 'Ok', success: true, tags });
  })
  .catch((e) => {
    res.status(400).json({ message: 'error' });
    next(e);
  });
})
  // 增加tag
  .post((req, res, next) => {
    const { tagName, summary, sectionName } = req.body;
    var tag = {
      tagName: tagName,
      summary: summary,
      sectionName:sectionName
    }
    TagModel.save(tag)
      .then((result) => {
        console.log(result, '   tag保存成功');
        res.status(200).json({ message: 'Ok', success: true, tag });
      })
  });

router.post('/tags/search', (req, res, next) => {
  const { text } = req.body;
  if (text) {
    TagModel.find({ tagName: { $regex: text, $options: 'i' } })
      .then((result) => {
        res.status(200).json({ message: 'Ok', success: true, result });
      });
  } else {
    res.status(400).json({ message: 'error' });
  }
})

router.route('/tags/:id').patch((req, res, next) => {
  const { id } = req.params;
  const { tagName, summary,sectionName } = req.body;
  let tag = {
    tagName,
    summary,
    sectionName,
  }
  TagModel.update({
    _id: id
  },
    tag
  ).then((result) => {
    if (!result || result.ok === 0) {
      res.status(400).json({ message: '修改失败' });
      return;
    }
    res.status(200).json({ message: 'Ok', success: true, result });
  }).catch((e) => {
    res.status(400).json({ message: 'error' });
    next(e);
  });
})
  .delete((req, res, next) => {
    const { id } = req.params;
    TagModel.remove({
      _id: id,
    })
      .then((result) => {
        console.log(!result, "=====", result.ok)
        if (!result) {
          res.status(400).json({ message: 'error' });
          return;
        }
        res.status(200).json({ message: 'Ok', success: true, result });
      })
      .catch((e) => {
        res.status(400).json({ message: 'error' });
        next(e);
      });
  });


module.exports = router;