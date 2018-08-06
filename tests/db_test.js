const _ = require('partial-js')
const { state, add, remove } = require('../database')

console.time('start')

// for (const user of _.range(1, 10).map(i => 'user_' + i))
// for (const no of _.range(1, 50))
// for (const dep of ['포어과', '네어과', '노어과', '스페인어과', '경제학과', '경영학과'])
//   add(user, { no, dep })

// for (const user of _.range(1, 10).map(i => 'user_' + i))
// for (const no of _.range(1, 50))
// for (const dep of ['포어과', '네어과', '노어과', '스페인어과', '경제학과', '경영학과'])
//   remove(user, { no, dep })



add('u_1', { no: 10, dep: '포어과', name: '시청각' })
add('u_2', { no: 10, dep: '포어과', name: '시청각' })
add('u_3', { no: 10, dep: '포어과', name: '시청각' })
add('u_1', { no: 1,  dep: '네어과', name: '시청각' })
add('u_3', { no: 1,  dep: '네어과', name: '시청각' })
add('u_2', { no: 1,  dep: '네어과', name: '시청각' })

remove('u_1', { no: 10, dep: '포어과', name: '시청각' })
remove('u_2', { no: 10, dep: '포어과', name: '시청각' })
remove('u_1', { no: 10, dep: '포어과', name: '시청각' })

console.log(state)

console.timeEnd('start')