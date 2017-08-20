const util = require('util');
const EventEmitter = require('events').EventEmitter;
function Q(fn) {
  EventEmitter.call(this);
  this._q = [];
  this._fn = fn;
  this._busy = false;
}

util.inherits(Q, EventEmitter);

Q.prototype.add = function(data) {
  this._q.push(data);
  this.emit('add', data);
  if (this._q.length === 1) {
    this.process();
  }
};

Q.prototype.reset = function() {
  this._busy = false;
};

Q.prototype.process = function() {
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

Q.prototype.length = function() {
  return this._q.length;
};

module.exports = Q;
