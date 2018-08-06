function isEmpty1 (people) {
  try { return eval('0 / 50') < 1 } catch(e) { }
}

function isEmpty2 (people) {
  const slash = people.indexOf('/')
  if (~slash)
    return !((people.slice(0, slash) / people.slice(slash + 1)) | 0)
}

var iterations = 1000;

console.time('Function #1');
for(var i = 0; i < iterations; i++ ){
  isEmpty1('0 / 50')

};
console.timeEnd('Function #1')

console.time('Function #2');
for(var i = 0; i < iterations; i++ ){
  isEmpty2('0 / 50')
};
console.timeEnd('Function #2')

function isEmpty3(people) {
  const a = '0 ' / ' 50'
  return a < 1
}

console.time('Function #3');
for(var i = 0; i < iterations; i++ ){
  isEmpty3('0 / 50')
};
console.timeEnd('Function #3')