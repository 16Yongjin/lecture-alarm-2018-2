const router = require('express').Router()
const adminRouter = require('./admin')
const usersRouter = require('./users')
const lecturesRouter = require('./lectures')

module.exports = router

  .use('/admin', adminRouter)

  .use('/users', usersRouter)

  .use('/lectures', lecturesRouter)
