const Q = require('./lib/queue');

const q = new Q(msg => {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(msg);
    }, 1000);
  });
});

q.on('add', data => {
  console.log('add', data);
});

q.on('error', err => {
  console.log('error', data);
});

q.on('processed', data => {
  console.log('processed', data);
});

q.add(1);
q.add(2);
q.add(3);
