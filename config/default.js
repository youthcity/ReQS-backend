module.exports = {
  port: 3000,
  session: {
    secret: 'treqs',
    key: 'treqs',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/tblog'
};