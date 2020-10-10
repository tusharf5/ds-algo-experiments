/**
 * new PromiseMy((resolve, reject) => {
 *
 *    // do some stuff
 *     resolve();
 *
 * })
 * @param callback
 */
function PromiseMy(callback) {
  this.state = 'pending';
  this.resolved = null;
  this.rejected = null;
  this.listeners = [];
  this.errorlisteners = [];

  function resolve(value) {
    this.state = 'fulfilled';
    this.resolved = value;
    this.listeners.forEach((thenable) => {
      try {
        const val = thenable(this.resolved);
        if (val) {
          this.resolved = val;
        }
      } catch (e) {
        this.errorlisteners.forEach((errL) => {
          const val = errL(e);
          if (val) {
            this.resolved = val;
          }
        });
      }
    });
  }

  function reject(value) {
    this.state = 'rejected';
    this.rejected = value;
  }

  const res = resolve.bind(this);
  const rej = reject.bind(this);

  process.nextTick(() => {
    callback(res, rej);
  });
}

PromiseMy.prototype.then = function (callback) {
  this.listeners.push(callback);
  return this;
};

PromiseMy.prototype.catch = function (callback) {
  this.errorlisteners.push(callback);
  return this;
};

const a = new PromiseMy((res, rej) => {
  res(123);
});

a.then((a) => {
  console.log(`hye ia ms ${a}`);
  return 4;
})
  .then((b) => {
    console.log(`hye i am second ${b}`);
    throw new Error('Errorooooo')
  })
  .catch((e) => {
    console.log('error caught', e);
  });
