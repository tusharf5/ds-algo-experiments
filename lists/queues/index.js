function Queue() {
  this.__storage = {};
  this.__internalSize = 0;
  this.__head = 0;
  this.__tail = 0;
}

Queue.prototype.enqueue = function enqueue(data) {
  this.__storage[this.__internalSize++] = data;
  return this.__internalSize;
};

// bad implementation o(n)
// this removes the first element and then shifts the entire [array like object] to one place earlier.
Queue.prototype.dequeue = function dequeue() {
  if (!this.__storage['0']) {
    throw Error('Empty Queue');
  }
  const first = this.__storage['0'];
  delete this.__storage['0'];
  this.__internalSize--;
  for (let i = 0; i <= this.__internalSize; i++) {
    this.__storage[i] = this.__storage[i + 1];
  }
  return first;
};

// good implementation o(1)
// this implementation maintains a pointer to the head key
// everytime we remove an item from head we increment the header
Queue.prototype.dequeue = function dequeue() {
  if (!this.__storage[this.__head]) {
    throw Error('Empty Queue');
  }
  const head = this.__storage[this.__head];
  delete this.__storage[this.__head];
  this.__internalSize--;
  this.__head++;
  return head;
};

Queue.prototype.size = function size() {
  return this.__internalSize;
};
