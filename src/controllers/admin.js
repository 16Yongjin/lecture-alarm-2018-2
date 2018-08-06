const _ = require('partial-js')
const { state } = require('../database')
const looper = require('../api/loop')

const getStatus = (req, res) => {
  res.send(state)
}

const setLoopInterval = (req, res) => {
  const interval = Math.max(req.params.interval, 1000)
  looper.setInterval(interval)
  res.send({ interval })
}

module.exports = { getStatus, setLoopInterval }
