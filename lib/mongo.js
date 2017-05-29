var mongoose = require("mongoose");
var db = mongoose.connect('mongodb://localhost:27017/tblog');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

// User
var UserSchema = new Schema({
  username: { type: String, require: true},
  password: { type: String, require: true },
  avatar: { type: String, default: 'http://opbc041f6.bkt.clouddn.com/sf/avataravatar_1.jpeg' },
  gender: { type: String, enum: ['m', 'f', 'x'] },  // m 男生 f 女生 x 保密
  aboutMe: { type: String },
  location: { type: String }, // 位置信息
  email: { type: String },  // 邮箱地址
  follows: [{type: ObjectId, ref: 'User'}], //关注的人
  fans: [{type: ObjectId, ref: 'User'}], // 被关注的人
  typeId: {type: Number, require: true, default: 0},
  creationDate: { type: Date, required: true, default: Date.now }, //创建时间
  updatedDate: {type: Date, default: Date.now} //更新时间
});

var UserModel = db.model('user', UserSchema);
exports.User = UserModel;

exports.db = db;
