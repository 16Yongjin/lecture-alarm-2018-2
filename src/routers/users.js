const userController = require('../controllers/users')
const router = require('express').Router()

module.exports = router

  .get('/:token', userController.myLectures)
  
  .post('/register', userController.registerLecture)
  
  .post('/delete', userController.deleteLecture)

