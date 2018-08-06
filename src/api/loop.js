const _ = require('partial-js')
const { state, remove } = require('../database/index')
const Lecture = require('./lecture')
const send = require('./send')

const sendAndRemove = (token, dep, no) => {
  const lecture = state.users[token][`${dep}_${no}`]
  const msg = [lecture.name, lecture.professor, lecture.info].join(' / ') + ' 자리 났어요.'
  console.log(msg)
  send(token, '수강신청 빈자리 알람', msg)
  remove(token, { dep, no })
}

const Loop = () => {
  const hour = (new Date()).getHours()
  if (!(10 <= hour && hour < 16)) return console.log('skip')

  _.go(
    Object.entries(state.departments),
    _.each(([dep, lectures]) =>
      _.go(
        Lecture.check(dep, _.keys(lectures)),
        _.each(no => _.each( lectures[no], _(sendAndRemove, _, dep, no) ))
      )
    )
  )
}

class Looper {
  constructor (interval) {
    this.loop = setInterval(Loop, interval)
  }

  setInterval (interval) {
    clearInterval(this.loop)
    this.loop = setInterval(Loop, interval)
  }
}

const looper = new Looper(3000)

module.exports = looper
