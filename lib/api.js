var UserModel = require('../models/users');

module.exports = {
  // 添加数据
  save(data) {
    return new Promise((resolve, reject) => {
      UserModel.create(data, (error, doc) => {
        if (error) {
          reject(error);
        } else {
          console.log('save doc:', doc);
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