var TagModel = require('../lib/mongo').Tag;

module.exports = {
  // 添加数据
  save(data) {
    return new Promise((resolve, reject) => {
      TagModel.create(data, (error, doc) => {
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
      TagModel.find(data, fields, options, (error, doc) => {
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
      TagModel.findOne(data, (error, doc) => {
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
      TagModel.findById(data, (error, doc) => {
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
      TagModel.update(conditions, update, (error, doc) => {
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
      TagModel.remove(conditions, (error, doc) => {
        if (error) {
          reject(error);
        } else {
          resolve(doc);
        }
      });
    });
  }
}