const EventEmitter = require('events').EventEmitter;

function add(data) {
  this._q.push(data);
  this.emit('add', data);
  if (this._q.length === 1) {
    this.process();
  }
};

function reset() {
  this._busy = false;
};

function process() {
  if (this._q.length <= 0) {
    this.emit('empty');
    return;
  }

  if (this._busy) {
    return;
  }

  this._busy = true;
  this._fn(this._q[0])
    .then(() => {
      // success!
      const data = this._q.shift();
      this.emit('processed', data);
      this.reset();
      this.process();
    })
    .catch(err => {
      // we keep trying for ever;
      // this will get around network drop blackouts.
      this.emit('error', err);
      this.reset();
      this.process();
    });
};

function getLength() {
  return this._q.length;
};

function Q(fn) {
  const o = Object.create(EventEmitter.prototype, {
    _q: {
      value: [],
    },
    _fn: {
      value: fn,
    },
    _busy: {
      value: false,
    },
    add: {
      value: add,
    },
    process: {
      value: process,
    },
    length: {
      value: getLength
    },
    reset: {
      value: reset
    }
  });

  EventEmitter.call(this);
  return o;
}

module.exports = Q;
