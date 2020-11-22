// refresh heaps here https://www.youtube.com/watch?v=WCm3TqScBM8

class MinHeap {
  heap = [];

  insert(number) {
    if (this.heap.length === 0) {
      this.heap[0] = number;
      return;
    }

    const indexForElement = this.heap.length;
    // put the element at the last empty space
    this.heap[indexForElement] = number;
    // compare the element with its parent and move up if required
    this.compareAndMoveUp(indexForElement);
  }

  compareAndMoveUp(index) {
    const number = this.heap[index];
    const parentIndex = Math.floor((index - 1) / 2);
    const hasParent = parentIndex >= 0;
    if (hasParent) {
      const parent = this.heap[parentIndex];
      const isSmallerThanParent = number < parent;
      if (isSmallerThanParent) {
        // swap them
        this.heap[parentIndex] = number;
        this.heap[index] = parent;
        this.compareAndMoveUp(parentIndex);
      }
    }
  }

  deleteMin() {
    const rootIndex = 0;
    const rootNumber = this.heap[rootIndex];
    const lastLeafNumberIndex = this.heap.length - 1;
    const lastLeafNumber = this.heap[lastLeafNumberIndex];
    // replace root with the last leaf
    this.heap[rootIndex] = lastLeafNumber;
    this.heap[lastLeafNumberIndex] = rootNumber;
    // delete last leaf now
    this.heap.length = this.heap.length - 1;
    // now we need to do heapify
    this.compareAndMoveDown(rootIndex);
    return rootNumber;
  }

  compareAndMoveDown(index) {
    const parent = this.heap[index];
    const leftChildIndex = (2 * index) + 1;
    const rightChildIndex = (2 * index) + 2;
    const lChild = this.heap[leftChildIndex];
    const rChild = this.heap[rightChildIndex];
    
      const lChildIsSmaller = lChild < parent;
      if (lChildIsSmaller) {
        // swap them
        this.heap[leftChildIndex] = parent;
        this.heap[index] = lChild;
        this.compareAndMoveDown(leftChildIndex);
        return;
      }

      const rChildIsSmaller = rChild < parent;
      if (rChildIsSmaller) {
        // swap them
        this.heap[rightChildIndex] = parent;
        this.heap[index] = rChild;
        this.compareAndMoveDown(rightChildIndex);
        return;
      }
    
  }

  minimum() {
    return this.heap[0];
  }

  log() {
    console.log(JSON.stringify(this.heap));
  }
}

const bro = new MinHeap();


bro.insert(3);
bro.insert(5);
bro.insert(2);
bro.insert(1);
bro.insert(-1);
bro.insert(0);
bro.insert(10);
bro.insert(12);
bro.insert(-12);
bro.log();
