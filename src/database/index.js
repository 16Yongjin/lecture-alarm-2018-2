const fs = require('mz/fs')

const state = {
  users: {},
  departments: {}
}

const backup = state => fs.writeFile('src/database/state.json', JSON.stringify(state))
  .then(() => console.log('backed up'))
  .catch(console.error)

// 시작할 때 한 번만 실행됨
const restore = () => 
    fs.readFile('src/database/state.json', 'utf-8')
      .then(backuped => Object.assign(state, JSON.parse(backuped)) )
      .catch(console.error)

// lec: { no, name, prof, ...info }
const add = (token, lecture) => {
  const dep = lecture.dep
  const lectureId = `${dep}_${lecture.no}`

  // 중복 등록 방지
  if (state.users[token] && state.users[token][lectureId]) return
  // 유저 등록 강의 추가
  state.users[token] = { ...state.users[token], [lectureId]: lecture }

  // 학과 강의 번호와 그 강의를 등록한 유저 토큰 인덱싱
  const department = state.departments[dep]
  const tokens = (department && department[lecture.no]) || []
  state.departments[dep] = { ...department, [lecture.no]: [...tokens, token] }

  backup(state)
}

const remove = (token, lecture) => {
  const dep = lecture.dep
  const lectureId = `${dep}_${lecture.no}`

  if (!(state.users[token] && state.users[token][lectureId] && state.departments[dep])) return

  // 유저 강의 삭제
  delete state.users[token][lectureId]

  state.departments[dep][lecture.no] = (state.departments[dep][lecture.no] || []).filter(i => i !== token)

  state.departments[dep][lecture.no].length <= 0 && delete state.departments[dep][lecture.no]

  Object.values(state.departments[dep]).every(i => !i) && delete state.departments[dep]

  backup(state)
}

const listUserLectures = token => state.users[token] ? Object.values(state.users[token]) : []

const countUserLectures = token => state.users[token] ? Object.keys(state.users[token]).length : 0

module.exports = { state, add, remove, listUserLectures, countUserLectures, restore }
