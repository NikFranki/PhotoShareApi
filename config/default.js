module.exports = {
  port: 8888,
  session: {
    secret: 'phoneShare',
    key: 'phoneShare',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/phoneShare'
}
