const cheerio = require('cheerio')
const rp = require('request-promise')
const _ = require('partial-js')
const depsToId = require('./deps')
const libsToId = require('./libs')
const types = ['no', 'area', 'year', 'id', 'name', 'syllabus', 'required', 'online', 'foreign', 'teamTeaching', 'professor', 'credit', 'time', 'timeRoom', 'people', 'note']

const baseUrl = 'http://wis.hufs.ac.kr:8989/src08/jsp/lecture/LECTURE2020L.jsp?tab_lang=K&ag_ledg_year=2018&ag_ledg_sessn=3&ag_org_sect=A&campus_sect=h1&'
const url = (gubun, dep) => `${baseUrl}gubun=${gubun}&ag_crs_strct_cd=${dep}&ag_compt_fld_cd=${dep}`

const depToUrl = (department) =>
  depsToId[department] ? url('1', depsToId[department]) :
  libsToId[department] ? url('2', libsToId[department]) : false

const infos = {
  0: 'no',
  // 2: 'year',
  // 3: 'id',
  4: 'name',
  10: 'professor',
  13: 'info',
  // 14: 'people'
}

const trim = str => str.trim().replace(/\s{2,}/, '').replace(/\s?\(.+$/, '')

const isEmpty = (people = '') => {
  const slash = people.indexOf('/')
  if (~slash)
    return !((people.slice(0, slash) / people.slice(slash + 1)) | 0)
}

const trs = $ => $('div#premier1 > div.table > table > tbody > tr')

const parseLectures = dep => $ => $( trs($) ).map((idx, tr) => {
    if (!idx) return

    const lecture = { dep }
    $(tr).children('td').each((i, td) => infos[i] && (lecture[infos[i]] = trim($(td).text())))
    // lecture.isEmpty = isEmpty(lecture.people)

    return lecture
  })
  .get()


const asyncMemoize = fn => {
  const cache = {}
  return arg => cache[arg] ? Promise.resolve(cache[arg]) : fn(arg).then(res => (cache[arg] = res))
}

const list = asyncMemoize(dep => _.go(dep, depToUrl, rp, cheerio.load, parseLectures(dep)))

const filterEmpty = indeces => $ => 
  indeces.filter(idx => _.go($( trs($) ).eq(idx).children('td').eq(14).text(), isEmpty))

const check = (dep, indeces) =>
  _.go(dep, depToUrl, rp, cheerio.load, filterEmpty(indeces))

// console.time('r') 
// list('포르투갈어과').then(ls => console.timeEnd('r') )
// check('포르투갈어과', [1, 2, 3, 4, 5]).then(console.log)

const Lecture = {
  depToUrl,
  list, 
  check
}

module.exports = Lecture
