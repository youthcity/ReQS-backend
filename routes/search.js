var express = require('express');
var router = express.Router();

var QuestionModel = require('../models/question');
// search 根据关键字搜索结果
router.get('/', (req, res, next) => {
  const { q } = req.query;
  QuestionModel.searchByKeyWord(q)
    .then((result) => {
      res.status(200).json({ message: 'Ok', success: true, result });     
    })
    .catch((e) => {
      res.status(400).json({ message: 'error' });
      next(e);
    });
});

module.exports = router;