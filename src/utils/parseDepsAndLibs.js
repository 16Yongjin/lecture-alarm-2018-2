const cheerio = require('cheerio')
const rp = require('request-promise')

const main = async () => {
  const html = await rp('http://wis.hufs.ac.kr:8989/src08/jsp/lecture/LECTURE2020L.jsp?tab_lang=K&ag_ledg_year=2019&ag_ledg_sessn=1&ag_org_sect=A&campus_sect=H2&gubun=1&ag_crs_strct_cd=AQR02_H2&ag_compt_fld_cd=303_H2')
  const $ = cheerio.load(html)

  const $deps = $('select[name="ag_crs_strct_cd"] > option')
  const deps = $deps.map((i, elem) => {
    const dep = $(elem).text().match(/-\xa0(.+)\xa0\(/)[1]
    const id = $(elem).attr('value')
    return [[dep, id]]
  })
  .get()
  .reduce((acc, [dep, id]) => (acc[dep] = id, acc), {})

  const $libs = $('select[name="ag_compt_fld_cd"] > option')
  const libs = $libs.map((i, elem) => {
    const lib = $(elem).text().replace(/\xa0/g, ' ').trim().replace(/\(.+\)/, '')
    const id = $(elem).attr('value')
    return [[lib, id]]
  })
  .get()
  .reduce((acc, [lib, id]) => (acc[lib] = id, acc), {})
  


  // console.log(deps)
  console.log(libs)

  
}


main()