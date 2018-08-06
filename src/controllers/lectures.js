const { list, depToUrl } = require('../api/lecture')

const listLectures = (req, res) => {
  const dep = req.params.dep
  dep && depToUrl(dep) ? 
    list(dep)
    .then(ls => res.send(ls))
    .catch(e => res.status(400).send('내부 서버 에러') ) : res.status(400).send('학과/교양을 보내세요.')
}

module.exports = { listLectures }
