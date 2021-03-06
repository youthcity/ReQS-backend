var AnswerModel = require('../lib/mongo').Answer;

module.exports = {
  addComment(answerId, comment) {
    return new Promise((resolve, reject) => {
      AnswerModel.update({
        _id: answerId
      }, {
          $push: { comment: comment }
        }, (error, doc) => {
          if (error) {
            reject(error);
          } else {
            resolve(doc);
          }
        }

      );
    });
  },

  getAnswer(questionId) {
    return AnswerModel
      .find({ questionId })
      .populate('author')
      .populate({ path: 'comment.author', model: 'user'})
      .sort({ _id: 1 })
      .exec();
  },
  getAnswerByTimeDown(questionId) {
    return AnswerModel
      .find({ questionId })
      .populate('author')
      .populate({ path: 'comment.author', model: 'user'})
      .sort({ creationDate: -1 })
      .exec();
  },
  getAnswerByTimeUp(questionId) {
    return AnswerModel
      .find({ questionId })
      .populate('author')
      .populate({ path: 'comment.author', model: 'user'})
      .sort({ creationDate: 1 })
      .exec();
  },
  getAnswerListByUserId(id) {
    return AnswerModel
      .find({ author: id })
      .populate('questionId')
      .sort({ _id: 1 })
      .exec();
  },
  addThanks(answerId, userId) {
    return AnswerModel
      .findOneAndUpdate({
        _id: answerId
      },{
        $addToSetpush: { thanks: userId }
      })
      .exec();
  },
  voteUp(id, userId) {
    return AnswerModel
      .update({
        _id: id
      }, {
        $inc: {voteup_count: 1},
        $addToSet: {likes: userId},
      })
  },
  voteDown(id, userId) {
    return AnswerModel
      .update({
        _id: id
      }, {
        $inc: { voteup_count: -1 },
        $addToSet: { hates: userId }
      })
  },   
  // 获取回答总数        
  getTotalAnswers() {
    return AnswerModel.count({})
      .exec();
  },

  // 添加数据
  save(data) {
    return new Promise((resolve, reject) => {
      AnswerModel.create(data, (error, doc) => {
        if (error) {
          reject(error);
        } else {
          resolve(doc);
        }
      });
    });
  },
  find(data = {}, fields = null, options = {}) {
    return new Promise((resolve, reject) => {
      AnswerModel.find(data, fields, options, (error, doc) => {
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
      AnswerModel.findOne(data, (error, doc) => {
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
      AnswerModel.findById(data)
        .populate('author')
        .populate('tags')
        .exec((error, doc) => {
          if (error) {
            reject(error);
          } else {
            resolve(doc);
          }
        });

      // AnswerModel.findById(data, (error, doc) => {
      //   if (error) {
      //     reject(error);
      //   } else {
      //     resolve(doc);
      //   }
      // });
    });
  },

  update(conditions, update) {
    return new Promise((resolve, reject) => {
      AnswerModel.update(conditions, update, (error, doc) => {
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
      AnswerModel.remove(conditions, (error, doc) => {
        if (error) {
          reject(error);
        } else {
          resolve(doc);
        }
      });
    });
  }
}