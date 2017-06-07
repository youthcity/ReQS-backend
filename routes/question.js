var express = require('express');
var router = express.Router();

var QuestionModel = require('../models/question');
var AnswerModel = require('../models/answer');
// 批量上传
// var model = require('../lib/mongo').Question;
// var data =require('./data/topic_data.json');


// Question /question
router.route('/')
  // 获取问题列表
  .get((req, res, next) => {
    // 批量上传数据代码
    // model.collection.insert(data.topics, (err, doc) => {
    //   if(err) {
    //     console.log('err   ', err);
    //   }
    //   res.status(200).json(doc);
    // });

    // QuestionModel.find()
    //   .then((questions) => {
    //     res.status(200).json({ message: 'Ok', success: true, questions });
    //   })
    //   .catch((e) => {
    // res.status(400).json({ message: 'error' });
    // next(e);
    //   });
    var { type } = req.query;

    switch (type) {
      case 'excellent':
        QuestionModel.getQuestionListByPopular()
          .then((result) => {
            res.status(200).json({ message: 'Ok', success: true, result });
            return;
          })
          .catch((e) => {
            res.status(400).json({ message: 'error' });
            next(e);
          });
        break;
      case 'no_reply':
        QuestionModel.getQuestionListByNoReply()
          .then((result) => {
            res.status(200).json({ message: 'Ok', success: true, result });
            return;
          })
          .catch((e) => {
            res.status(400).json({ message: 'error' });
            next(e);
          });
        break;
      case 'recent':
        QuestionModel.getQuestionListByRecent()
          .then((result) => {
            res.status(200).json({ message: 'Ok', success: true, result });
            return;
          })
          .catch((e) => {
            res.status(400).json({ message: 'error' });
            next(e);
          });
        break;
      default:
        QuestionModel.getQuestionListByDefault()
          .then((result) => {
            res.status(200).json({ message: 'Ok', success: true, result });
            return;
          })
          .catch((e) => {
            res.status(400).json({ message: 'error' });
            next(e);
          });
    }

  })
  .post((req, res, next) => {
    const user = req.session.user;
    const { title, content, tags } = req.body;

    if (!user) {
      res.status(400).json({ message: '用户未登录' });
      return;
    }
    let author = user._id;
    let question = {
      author,
      title,
      content,
      tags,
    };
    QuestionModel.save(question)
      .then((result) => {
        console.log(result, '   question保存成功');
        res.status(200).json({ message: 'Ok', success: true, result });
      })
  });


// Question /question:id get delete patch
router.route('/:id')
  .get((req, res, next) => {
    // 获取问题所有相关信息
    const { id } = req.params;

    Promise.all([
      QuestionModel.getQuestionById(id),// 获取文章信息
      AnswerModel.getAnswer(id),// 获取该文章所有留言
      QuestionModel.incPv(id)// pv 加 1
    ]).then((result) => {
      console.log(result)
      var question = result[0];
      var answers = result[1];
      res.status(200).json({ message: 'Ok', success: true, result: {
        question,
        answers,
      } });
    }).catch((e) => {
      res.status(400).json({ message: 'error' });
      next(e);
    });
  })
  .delete((req, res, next) => {
    const { id } = req.params;
    QuestionModel.remove({
      _id: id,
    })
      .then((result) => {
        if (!result || result.ok != 1) {
          res.status(400).json({ message: 'error' });
          return;
        }
        res.status(200).json({ message: 'Ok', success: true, result });
      })
      .catch((e) => {
        res.status(400).json({ message: 'error' });
        next(e);
      });
  })
  .patch((req, res, next) => {
    const { id } = req.params;
    const { tagName, summary } = req.body;
    let tag = {
      tagName,
      summary,
    }
    QuestionModel.update({
      _id: id
    },
      tag
    ).then((result) => {
      if (!result || result.ok === 0) {
        res.status(400).json({ message: 'error' });
        return;
      }
      res.status(200).json({ message: 'Ok', success: true, result });
    }).catch((e) => {
      res.status(400).json({ message: 'error' });
      next(e);
    });
  });

  // 问答点赞
  router.get('/:id/likes', (req, res, next) => {
    const user = req.session.user;

    if (!user) {
      res.status(400).json({ message: '用户未登录' });
      return;
    }
    const userId = user._id;
    const { id } = req.params;
    QuestionModel.addLikes(id, userId)
      .then((result) => {
        res.status(200).json({ message: 'Ok', success: true,result });
      })
      .catch((e) => {
        res.status(400).json({ message: 'error' });
        next(e);
      })

    
  });


// 根据问题ID 获取答案列表
router.get('/:id/AnswerList', (req, res, next) => {
    // 获取问题所有相关信息
    const { id } = req.params;
    const { type } = req.query;

    if (type === 'time') {
      AnswerModel.getAnswerByTimeDown(id).then((result) => {
        res.status(200).json({ message: 'Ok', success: true, result });
      }).catch((e) => {
        res.status(400).json({ message: 'error' });
        next(e);
      });
    } else {
      AnswerModel.getAnswerByTimeUp(id).then((result) => {
        res.status(200).json({ message: 'Ok', success: true, result });
      }).catch((e) => {
        res.status(400).json({ message: 'error' });
        next(e);
      });
    }
});

module.exports = router;