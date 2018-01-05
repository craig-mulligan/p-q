# p-q

> Tiny fifo promise queue

[![Build Status](https://travis-ci.org/hobochild/p-q.svg?branch=master)](https://travis-ci.org/hobochild/p-q)

```
npm i --save p-q
```

### Usage

Pass in a processing function that returns a promise to the constructor.
``` javascript

const PQ = require('p-q');

const q = PQ((msg) => {
  return new Promise(function(resolve, reject) {
    setTimeout(function () {
      resolve(msg);
    }, 1000);
  });
});

```

Then add some data to the queue:
``` javascript

q.add({
  foo: 'hii',
  bar: 'world'
})

```

Get events back:
``` javascript

q.on('processed', data => {
  console.log(`${JSON.stringify(data)} was processed`);
})

q.on('empty', _ => {
  console.log('queue is empty');
})

q.on('error', err => {
  console.error(err);
})

q.on('add', data => {
  console.log('new event added', data);
})

```
