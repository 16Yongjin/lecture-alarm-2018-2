const _ = require('partial-js')
const { add, remove, listUserLectures, countUserLectures } = require('../database')

const validateBody = (token, lecture) => token && lecture && lecture.dep && lecture.no

// /users/:token
const myLectures = (req, res) => 
{
  const token = req.params.token
  const lectures = listUserLectures(token)
  res.send(lectures)
}

const userLectureLimit = 5

const registerLecture = (req, res) => {
  const { token, lecture } = req.body
  if (!validateBody(token, lecture))
    return res.status(400).send({ error: '올바른 토큰과 강의 정보를 보내세요.' })
    
  if (countUserLectures(token) >= userLectureLimit)
    return res.status(400).send({ error: `강의는 ${userLectureLimit}개 까지 등록 가능합니다.` })

  add(token, lecture)
  const lectures = listUserLectures(token)
  res.send(lectures)
}

const deleteLecture = (req, res) => {
  const { token, lecture } = req.body

  if (!validateBody(token, lecture))
    return res.status(400).send({ error: '올바른 토큰과 강의 정보를 보내세요.' })

  remove(token, lecture)
  const lectures = listUserLectures(token)
  res.send(lectures)
}

module.exports = { myLectures, registerLecture, deleteLecture }
