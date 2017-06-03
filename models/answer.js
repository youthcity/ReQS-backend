var AnswerModel = require('../lib/mongo').Answer;

module.exports = {
  addComment(questionId, comment) {
    return new Promise((resolve, reject) => {
      AnswerModel.update({
        _id: questionId
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
      .sort({ _id: 1 })
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