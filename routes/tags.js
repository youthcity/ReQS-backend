var express = require('express');
var router = express.Router();

var TagModel = require('../models/tags');
// 批量上传
// var model = require('../lib/mongo').Tag;
// var data =require('./data/topic_data.json');


// Tag /tags
router.route('/')
  .get((req, res, next) => {
    // 批量上传数据代码
    // model.collection.insert(data.topics, (err, doc) => {
    //   if(err) {
    //     console.log('err   ', err);
    //   }
    //   res.status(200).json(doc);
    // });
    TagModel.find()
      .then((tags) => {
        res.status(200).json({ message: 'Ok', success: true, tags });
      })
      .catch((e) => {
        res.status(400).json({ message: 'error' });
        next(e);
      });
  })
  .post((req, res, next) => {
    const {tagName, summary} = req.body;
    var tag = {
      tagName:tagName,
      summary:summary
    }
    TagModel.save(tag)
      .then((result) => {
        console.log(result, '   tag保存成功');
        res.status(200).json({ message: 'Ok', success: true, tag });
      })
  });


// tag /tags:id get delete patch
router.route('/:id')
  .get((req, res, next) => {
    const { id } = req.params;
        TagModel.findOne({
          _id: id,
        })
      .then((tag) => {
        res.status(200).json({ message: 'Ok', success: true, tag });
      })
      .catch((e) => {
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
    TagModel.update({
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