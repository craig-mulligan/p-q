# p-q

> Tiny async fifo queue'in library

```
npm i --save p-q
```

### Usage

Pass in a processing function that returns a promise to the contructor.
```
const Q = require('p-q');

const q = new Q((msg) => {
  return new Promise(function(resolve, reject) {
    setTimeout(function () {
      resolve(msg);
    }, 1000);
  });
});
```

Then add some data to the queue:
```
q.add({
  foo: 'hii',
  bar: 'world'
})
```

Get events back:
```
q.on('processed', data => {
  console.log(`${JSON.stringify(data)} was processed`);
})

q.on('empty', data => {
  console.log('queue is empy');
})

q.on('error', err => {
  console.error(err);
})

q.on('add', (data) => {
  console.log('new event added', data);
})
```
