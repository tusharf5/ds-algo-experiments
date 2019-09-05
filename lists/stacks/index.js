function Stack(maxLength) {
  this.__maxLength = maxLength;
  this.__internalSize = 0;
  this.__storage = {};
}

Stack.prototype.pop = function pop() {
  if (this.__internalSize === 0) {
    throw Error('Stack Empty');
  }
  const data = this.__storage[this.__internalSize];
  delete this.__storage[this.__internalSize];
  return data;
};

Stack.prototype.push = function push(data) {
  if (this.__internalSize + 1 > this.__maxLength) {
    throw Error('Stack Full');
  }
  this.__storage[this.__internalSize] = data;
  this.__internalSize += 1;
};

Stack.prototype.size = function size() {
  return this.__internalSize;
};

Stack.prototype.toString = function size() {
  if (this.__internalSize === 0) {
    return console.log('[]');
  }
  let string = '[ ';
  for (let i = 0; i <= this.__internalSize; i++) {
    string += this.__storage[i] + ', ';
  }
  string += ' ]';
  return console.log(string);
};

