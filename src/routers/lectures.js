const router = require('express').Router()
const lectureController = require('../controllers/lectures')

module.exports = router

  .get('/:dep', lectureController.listLectures)
