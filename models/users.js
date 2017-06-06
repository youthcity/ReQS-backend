var UserModel = require('../lib/mongo').User;

module.exports = {
  // inc pv
  incPv(id) {
    return UserModel
      .update({ _id: id }, { $inc: { pv: 1 } })
      .exec();
  },
  findFansById(id) {
    return UserModel.findOne({_id: id})
      .populate('fans')
      .select('fans')
      .exec();
  },
  findFollowsById(id) {
    return UserModel.findOne({ _id: id })
      .populate('follows')
      .select('follows')
      .exec();
  },
  addFollow(userId, followId) {
    return UserModel.findOneAndUpdate({
      _id: userId,
    }, {
      $addToSet: { follows: followId}
    })
    .exec();
  },
  addFan(userId, fanId) {
    return UserModel.findOneAndUpdate({
      _id: userId,
    }, {
      $addToSet: { fans: fanId}
    })
    .exec();
  },
  addFavorite(userId, questionId) {
    return UserModel.findOneAndUpdate({
      _id: userId,
    }, {
      $addToSet: { favlists: questionId}
    })
    .exec();    
  },

  // 添加数据
  save(data) {
    return new Promise((resolve, reject) => {
      UserModel.create(data, (error, doc) => {
        if (error) {
          reject(error);
        } else {
          resolve(doc);
        }
      });
    });
  },
  find(data={}, fields=null, options={}) {
    return new Promise((resolve, reject) => {
      UserModel.find(data, fields, options, (error, doc) => {
        if (error) {
          reject(error);
        } else {
          resolve(doc);
        }
      });
    });
  },

  // findOne
  findOne(data) {
    return new Promise((resolve, reject) => {
      UserModel.findOne(data, (error, doc) => {
        if (error) {
          reject(error);
        } else {
          resolve(doc);
        }
      });
    });
  },

  findById(data) {
    return new Promise((resolve, reject) => {
      UserModel.findById(data, (error, doc) => {
        if (error) {
          reject(error);
        } else {
          resolve(doc);
        }
      });
    });
  },

  update(conditions, update) {
    return new Promise((resolve, reject) => {
      UserModel.update(conditions, update, (error, doc) => {
        if (error) {
          reject(error);
        } else {
          resolve(doc);
        }
      });
    });
  },

  remove(conditions) {
    return new Promise((resolve, reject) => {
      UserModel.remove(conditions, (error, doc) => {
        if (error) {
          reject(error);
        } else {
          resolve(doc);
        }
      });
    });
  }
}