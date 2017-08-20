const test = require('ava');
const Q = require('./index.js');
let q;

test.beforeEach(t => {
  q = new Q(msg => {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(msg);
      }, 250);
    });
  });
});

test('.add', t => {
  q.add(1);
  t.is(q.length(), 1);
});

test.cb('.add event handle', t => {
  q.on('add', d => {
    t.is(d, 1);
    t.end();
  });
  q.add(1);
});

test.cb('processed event handle', t => {
  q.on('processed', d => {
    t.is(d, 1);
    t.end();
  });
  q.add(1);
});

test.cb('empty event handle', t => {
  q.on('empty', () => {
    t.pass();
    t.end();
  });
  q.add(1);
  q.add(2);
});
