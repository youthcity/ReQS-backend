var qiniu = require('qiniu');
var express = require('express');
var router = express.Router();
var path = require('path');
var config = require('config-lite')({
  filenames: 'default',
  config_basedir: path.resolve(__dirname, '..'),
  config_dir: 'config'
});

var QuestionModel = require('../models/question');

qiniu.conf.ACCESS_KEY = config.ACCESS_KEY;
qiniu.conf.SECRET_KEY = config.SECRET_KEY;

//要上传的空间
var bucket = 'youthcity';
//上传到七牛后保存的文件名
var key = 'reqs.png';
//构建上传策略函数




// search 根据关键字搜索结果
router.post('/upload/token', (req, res, next) => {
  function uptoken(bucket, key) {
    console.log(bucket);
    var putPolicy = new qiniu.rs.PutPolicy(bucket);
    return putPolicy.token();
  }
  //要上传的空间
  var bucket = 'youthcity';
  //上传到七牛后保存的文件名
  var key = 'reqs.png';
  var uptoken = uptoken(bucket, key);
  res.status(200).json({uptoken});
});

module.exports = router;