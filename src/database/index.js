const fs = require('mz/fs')

const state = {
  users: {},
  departments: {},
  // lectureToUser: {}
}

const backup = state => fs.writeFile('src/database/state.json', JSON.stringify(state)).then(() => console.log('backed up')).catch(console.error)

const restore = async () => {
  try {
    const backuped = await fs.readFile('src/database/state.json', 'utf-8')
    Object.assign(state, JSON.parse(backuped))
  } catch (e) {
    console.error('restore failed')
  }
}

// lec: { no, name, prof, ...info }
const add = (token, lecture) => {
  const dep = lecture.dep
  const lectureId = `${dep}_${lecture.no}`

  // 중복 등록 방지
  if (state.users[token] && state.users[token][lectureId]) return

  // 유저 등록 강의 추가
  state.users[token] = { ...state.users[token], [lectureId]: lecture }

  // 강의에 유저 추가 (직접 구현한 Set과 성능 차이 없음)
  // state.lectureToUser[lectureId] = Array.from(
  //   new Set([...(state.lectureToUser[lectureId] || []), token])
  // )


  // 학과 강의 인덱스 추가
  // const department = state.departments[dep]
  // const lecCount = department && department[lecture.no] ? department[lecture.no] : 0

  // state.departments[dep] = { ...department, [lecture.no]: lecCount + 1}

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

  // 학과 강의 카운트 - 1
  // state.departments[dep][lecture.no] && state.departments[dep][lecture.no] --

  // 학과의 모든 강의 카운트가 0이라면 학과 삭제
  // Object.values(state.departments[dep]).every(i => !i) && delete state.departments[dep]
  
  state.departments[dep][lecture.no] = (state.departments[dep][lecture.no] || []).filter(i => i !== token)

  state.departments[dep][lecture.no].length <= 0 && delete state.departments[dep][lecture.no]

  Object.values(state.departments[dep]).every(i => !i) && delete state.departments[dep]


  // 강의에 등록된 유저 삭제
  // state.lectureToUser[lectureId] = state.lectureToUser[lectureId].filter(i => i !== token)

  // 강의에 등록된 유저가 없다면 강의 삭제
  // state.lectureToUser[lectureId].length <= 0 && delete state.lectureToUser[lectureId]

  backup(state)

}

const listUserLectures = token => state.users[token] ? Object.values(state.users[token]) : []

const countUserLectures = token => state.users[token] ? Object.keys(state.users[token]).length : 0

module.exports = { state, add, remove, listUserLectures, countUserLectures, backup, restore }
