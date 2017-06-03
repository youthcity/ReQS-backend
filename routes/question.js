var express = require('express');
var router = express.Router();

var QuestionModel = require('../models/question');
// 批量上传
// var model = require('../lib/mongo').Question;
// var data =require('./data/topic_data.json');


// Question /question
router.route('/')
  .get((req, res, next) => {
    // 批量上传数据代码
    // model.collection.insert(data.topics, (err, doc) => {
    //   if(err) {
    //     console.log('err   ', err);
    //   }
    //   res.status(200).json(doc);
    // });
    QuestionModel.find()
      .then((questions) => {
        res.status(200).json({ message: 'Ok', success: true, questions });
      })
      .catch((e) => {
        res.status(400).json({ message: 'error' });
        next(e);
      });
  })
  .post((req, res, next) => {
    const user = req.session.user;
    const {title, content, tags} = req.body;

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
    const { id } = req.params;
        QuestionModel.findById(id)
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
    QuestionModel.remove({
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
    let tag = {
      tagName,
      summary,
    }
    QuestionModel.update({
      _id: id},
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
    } );
  });


module.exports = router;