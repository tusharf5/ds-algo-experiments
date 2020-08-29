class MaxHeap {
  heap = [];
  heapSize = 0;

  insertNode(node) {
    // heap empty, simply add the node to the top
    if (this.heapSize === 0) {
      this.heap[0] = node;
      this.heapSize++;
    } else {
      // append node to the end of the array or left-most child of heap
      this.heap[this.heapSize] = node;
      this.heapSize++;
      this.adjustFromBottomToTop();
    }
  }

  adjustFromBottomToTop() {
    // taking the last node and comparing it with its parent (index/2)
    // if parent is smaller, then swap them
    // do this until parent is smaller than the current node
    let currentNodeIndex = this.heapSize - 1;
    let currentNodeVal = this.heap[currentNodeIndex];
    let toCompareWithIndex = Math.floor(currentNodeIndex / 2);
    let toCompareWithValue = this.heap[toCompareWithIndex];
    while (toCompareWithValue < currentNodeVal) {
      // swap these two
      this.heap[toCompareWithIndex] = currentNodeVal;
      this.heap[currentNodeIndex] = toCompareWithValue;
      currentNodeIndex = toCompareWithIndex;
      currentNodeVal = this.heap[currentNodeIndex];
      toCompareWithIndex = Math.floor(currentNodeIndex / 2);
      toCompareWithValue = this.heap[toCompareWithIndex];
    }
  }

  // delete root node
  deleteMaximum() {
    // if heap is empty return
    if (this.heapSize === 0) {
      return;
    }
    // take the right most leaf node
    let lastLeafValue = this.heap[this.heapSize - 1];
    // maximum node is at the root
    let maximum = this.heap[0];
    // swap these two
    this.heap[this.heapSize - 1] = maximum;
    this.heap[0] = lastLeafValue;
    // decrease the heapsize
    this.heapSize--;
    // check if new root needs to be re-positioned
    this.adjustFromTopToBottom();
    return maximum;
  }

  adjustFromTopToBottom() {
    //   (4)
    // (6)  (8)
    // compare 6 and 8, the bigger one will be replaced with 4
    //   (8)
    // (6)  (4)
    // now do same with 4 and its children
    let currentIndex = 0;
    let currentIndexValue = this.heap[currentIndex];
    let leftChildIndex = 2 * currentIndex + 1;
    let rightChildIndex = 2 * currentIndex + 2;
    // calculate which child to replace it with
    let biggerChildIndex =
      this.heap[leftChildIndex] > this.heap[rightChildIndex]
        ? leftChildIndex
        : rightChildIndex;
    if (biggerChildIndex >= this.heapSize) {
      biggerChildIndex = -1;
    }
    if (biggerChildIndex === -1 && leftChildIndex < this.heapSize) {
      biggerChildIndex = leftChildIndex;
    }
    if (biggerChildIndex === -1 && rightChildIndex < this.heapSize) {
      biggerChildIndex = rightChildIndex;
    }
    let biggerChild = this.heap[biggerChildIndex];
    let move = false;
    if (biggerChild && biggerChild > currentIndexValue) {
      move = true;
    }
    while (move) {
      // swap
      this.heap[currentIndex] = biggerChild;
      this.heap[biggerChildIndex] = currentIndexValue;
      //
      currentIndex = biggerChildIndex;
      currentIndexValue = this.heap[currentIndex];
      // calculate which child to replace it with
      leftChildIndex = 2 * currentIndex + 1;
      rightChildIndex = 2 * currentIndex + 2;
      biggerChildIndex =
        this.heap[leftChildIndex] > this.heap[rightChildIndex]
          ? leftChildIndex
          : rightChildIndex;
      if (biggerChildIndex >= this.heapSize) {
        biggerChildIndex = -1;
      }
      if (biggerChildIndex === -1 && leftChildIndex < this.heapSize) {
        biggerChildIndex = leftChildIndex;
      }
      if (biggerChildIndex === -1 && rightChildIndex < this.heapSize) {
        biggerChildIndex = rightChildIndex;
      }
      biggerChild = this.heap[biggerChildIndex];
      // do we need to do a replacement
      move = false;
      if (biggerChild && biggerChild > currentIndexValue) {
        move = true;
      }
    }
  }

  peak() {
    return this.heap[0];
  }
}

const heap = new MaxHeap();
