var QuestionModel = require('../lib/mongo').Question;

module.exports = {
  getQuestionById(id) {
    return QuestionModel.findById(id)
      .populate('author')
      .populate('tags')
      .exec()
  },
  incPv(id) {
    return QuestionModel
      .update({ _id: id }, { $inc: { pv: 1 } })
      .exec();
  },
  getQuestionListByDefault() {
    return QuestionModel.find()
      .populate('author')
      .exec();
  },
  getQuestionListByPopular() {
    return QuestionModel.find({excellent: 1})
      .populate('author')
      .exec();
  },
  getQuestionListByRecent() {
    return QuestionModel.find()
      .populate('author')
      .sort({'creationDate': -1})
      .exec();
  },
  getQuestionListByNoReply() {
    return QuestionModel.find({ answer: { $size: 0}})
      .populate('author')
      .sort({'creationDate': -1})
      .exec();
  },
  getQuestionListByUserId(id) {
     return QuestionModel.find({ author: id})
      .populate('author')
      .populate('tags')
      .sort({'creationDate': -1})
      .exec();   
  },
  // 添加数据
  save(data) {
    return new Promise((resolve, reject) => {
      QuestionModel.create(data, (error, doc) => {
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
      QuestionModel.find(data, fields, options, (error, doc) => {
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
      QuestionModel.findOne(data, (error, doc) => {
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
      QuestionModel.findById(data)
        .populate('author')
        .populate('tags')
        .exec((error, doc) => {
          if (error) {
            reject(error);
          } else {
            resolve(doc);
          }
        });

      // QuestionModel.findById(data, (error, doc) => {
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
      QuestionModel.update(conditions, update, (error, doc) => {
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
      QuestionModel.remove(conditions, (error, doc) => {
        if (error) {
          reject(error);
        } else {
          resolve(doc);
        }
      });
    });
  }
}