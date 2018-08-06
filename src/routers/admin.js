const adminController = require('../controllers/admin')
const router = require('express').Router()

module.exports = router

  .get('/state', adminController.getStatus)

  .get('/loop/:interval', adminController.setLoopInterval)
