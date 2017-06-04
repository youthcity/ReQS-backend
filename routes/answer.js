var express = require('express');
var router = express.Router();

var AnswerModel = require('../models/answer');
var QuestionModel = require('../models/question');
// 批量上传
// var model = require('../lib/mongo').Question;
// var data =require('./data/topic_data.json');


// Answer /answer
router.route('/')
  .get((req, res, next) => {
    // 批量上传数据代码
    // model.collection.insert(data.topics, (err, doc) => {
    //   if(err) {
    //     console.log('err   ', err);
    //   }
    //   res.status(200).json(doc);
    // });
    AnswerModel.find()
      .then((result) => {
        res.status(200).json({ message: 'Ok', success: true, result });
      })
      .catch((e) => {
        res.status(400).json({ message: 'error' });
        next(e);
      });
  })
  .post((req, res, next) => {
    const user = req.session.user;
    const { content, questionId } = req.body;

    if (!user) {
      res.status(400).json({ message: '用户未登录' });
      return;
    }
    let author = user._id;
    let question = {
      author,
      content,
      questionId,
    };
    AnswerModel.save(question)
      .then((result) => {
        console.log('result===question==', result);
        return QuestionModel.update({_id: questionId},{
          $push: { answer: result._id }
        });
      }).then((result) => {
        console.log(result, '   question保存成功');
        res.status(200).json({ message: 'Ok', success: true, result });
      })
      .catch((e)=>{
        res.status(400).json({ message: 'error' });
        next(e);
      });
  });


// Answer /answer:id get delete patch
router.route('/:id')
  .get((req, res, next) => {
    const { id } = req.params;
        AnswerModel.findById(id)
      .then((result) => {
        res.status(200).json({ message: 'Ok', success: true, result });
      })
      .catch((e) => {
        res.status(400).json({ message: 'error' });
        next(e);
      });
  })
  .delete((req, res, next) => {
    const { id } = req.params;
    AnswerModel.remove({
      _id: id,
    })
    .then((result) => {
      if (!result || result.ok != 1){
        res.status(400).json({ message: 'error' });
        return;
      }
        res.status(200).json({ message: 'Ok', success: true,result });
    })
    .catch((e) => {
      res.status(400).json({ message: 'error' });
      next(e);
    });
  })
  .patch((req, res, next) => {
    const { id } = req.params;
    const { tagName, summary} = req.body;
    let obj = {
      content,
    }
    AnswerModel.update({
      _id: id},
      obj
      ).then((result) => {
      if (!result || result.ok === 0) {
        res.status(400).json({ message: 'error' });
        return;
      }
      res.status(200).json({ message: 'Ok', success: true, result });
    }).catch((e) => {
      res.status(400).json({ message: 'error' });
      next(e);      
    } );
  });


// 评论功能
router.route('/:id/comment')
  .get((req, res, next) => {
    //todo 根据answer Id 获取所有评论
    const { id } = req.params;
        AnswerModel.findById(id)
      .then((result) => {
        res.status(200).json({ message: 'Ok', success: true, result });
      })
      .catch((e) => {
        res.status(400).json({ message: 'error' });
        next(e);
      });
  })
  .post((req, res, next) => {
    // 新增评论
    const { id } = req.params;
    const {content} = req.body;
    const user = req.session.user;

    if (!user) {
      res.status(400).json({ message: '用户未登录' });
      return;
    }
    let author = user._id;

    let comment = {
      content,
      author
     };
     AnswerModel.addComment(id, comment)
      .then((result) => {
        res.status(200).json({ message: 'Ok', success: true,result });
      })
      .catch((e) => {
        res.status(400).json({ message: 'error' });
      });
  })
  .delete((req, res, next) => {
    // 删除所有评论
    const { id } = req.params;
    AnswerModel.remove({
      _id: id,
    })
    .then((result) => {
      if (!result || result.ok != 1){
        res.status(400).json({ message: 'error' });
        return;
      }
        res.status(200).json({ message: 'Ok', success: true,result });
    })
    .catch((e) => {
      res.status(400).json({ message: 'error' });
      next(e);
    });
  });

module.exports = router;