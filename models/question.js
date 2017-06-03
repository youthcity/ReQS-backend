var QuestionModel = require('../lib/mongo').Question;

module.exports = {
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
  find(data={}, fields=null, options={}) {
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
      QuestionModel.findById(data, (error, doc) => {
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