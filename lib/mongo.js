var mongoose = require("mongoose");
var db = mongoose.connect('mongodb://localhost:27017/tblog');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

// User
var UserSchema = new Schema({
  username: { type: String, require: true},
  password: { type: String, require: true },
  avatar: { type: String, default: 'http://opbc041f6.bkt.clouddn.com/sf/avataravatar_1.jpeg' },
  gender: { type: String, enum: ['m', 'f', 'x'], default: 'x' },  // m 男生 f 女生 x 保密
  aboutMe: { type: String },
  location: { type: String }, // 位置信息
  email: { type: String },  // 邮箱地址
  follows: [{type: ObjectId, ref: 'user'}], //关注的人
  fans: [{type: ObjectId, ref: 'user'}], // 被关注的人
  favlists: [{type: ObjectId, ref: 'question'}], //收藏的问题 
  typeId: {type: Number, require: true, default: 0},
  creationDate: { type: Date, required: true, default: Date.now }, //创建时间
  updatedDate: {type: Date, default: Date.now}, //更新时间
  pv: { type: 'number', default: 0 }, // 访问次数
});

var UserModel = db.model('user', UserSchema);
exports.User = UserModel;

// Tag
var TagSchema = new Schema({
  tagName: {type: String},
  summary: {type: String},  // 描述
  sectionName: {type: String},
  creationDate: { type: Date, required: true, default: Date.now }, //创建时间
  updatedDate: {type: Date, default: Date.now}, //更新时间
});

var TagModel = db.model('tag', TagSchema);
exports.Tag = TagModel;

// Question
var QuestionSchema = new Schema({
  author:  { type: Schema.Types.ObjectId, ref: 'user' },
  title: { type: String },
  content: { type: String },
  excellent: {type: Number, default: 0},  // 加精 0 否 1 是
  answer: [{type: Schema.Types.ObjectId, ref: 'answer'}],
  likes: [{type: Schema.Types.ObjectId, ref: 'user'}], // 点赞的人群
  pv: { type: 'number', default: 0 }, // 访问次数
  tags: [{type: Schema.Types.ObjectId, ref: 'tag'}],
  voteup_count: { type: 'number', default: 0 },
  creationDate: { type: Date, required: true, default: Date.now }, //创建时间
  updatedDate: {type: Date, default: Date.now} //更新时间
});
var QuestionModel = db.model('question', QuestionSchema);
exports.Question = QuestionModel;

// Answer
var AnswerSchema = new Schema({
  author:  { type: Schema.Types.ObjectId, ref: 'user' },
  content: { type: String },
  comment: [
    {content: {type: String}, author: {type: Schema.Types.ObjectId, ref: 'user'}, creationDate: { type: Date, required: true, default: Date.now }}
  ],
  questionId: { type: Schema.Types.ObjectId, ref: 'question' },
  likes: [{type: Schema.Types.ObjectId, ref: 'user'}], // 点赞的人群
  hates: [{type: Schema.Types.ObjectId, ref: 'user'}],
  voteup_count: { type: 'number', default: 0 }, 
  thanks: [{type: Schema.Types.ObjectId, ref: 'user'}],
  creationDate: { type: Date, required: true, default: Date.now }, //创建时间
  updatedDate: {type: Date, default: Date.now} //更新时间
});
var AnswerModel = db.model('answer', AnswerSchema);
exports.Answer = AnswerModel;


exports.db = db;
