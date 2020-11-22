// refresh heaps here https://www.youtube.com/watch?v=WCm3TqScBM8

// minheap for numbers
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
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
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

const minheap = new MinHeap();

minheap.insert(3);
minheap.insert(5);
minheap.insert(2);
minheap.insert(1);
minheap.insert(-1);
minheap.insert(0);
minheap.insert(10);
minheap.insert(12);
minheap.insert(-12);
minheap.log();

// min heap for objects

class MinHeapForObjects {
  heap = [];

  constructor(hash, accessor) {
    if (!hash) {
      throw new Error('Please provide a hash map of id and its value;');
    }
    this.hash = hash;
    this.accessor = accessor;
  }

  getValue(id) {
    if (this.accessor) {
      return this.hash[id][this.accessor];
    }
    return this.hash[id];
  }

  insert({ id }) {
    if (this.heap.length === 0) {
      this.heap[0] = id;
      return;
    }

    const indexForElement = this.heap.length;
    // put the element at the last empty space
    this.heap[indexForElement] = id;
    // compare the element with its parent and move up if required
    this.compareAndMoveUp(indexForElement);
  }

  compareAndMoveUp(index) {
    const numberId = this.heap[index];
    const number = this.getValue(numberId);
    const parentIndex = Math.floor((index - 1) / 2);
    const hasParent = parentIndex >= 0;
    if (hasParent) {
      const parentId = this.heap[parentIndex];
      const parent = this.getValue(this.heap[parentIndex]);
      const isSmallerThanParent = number < parent;
      if (isSmallerThanParent) {
        // swap them
        this.heap[parentIndex] = numberId;
        this.heap[index] = parentId;
        this.compareAndMoveUp(parentIndex);
      }
    }
  }

  modify(id, value) {
    this.hash[id] = value;
    this.modified(id);
  }

  modified(id) {
    this.delete(id);
    this.insert({ id });
  }

  delete(id) {
    const index = this.heap.findIndex((e) => e === id);
    const lastLeafNumberIndex = this.heap.length - 1;
    const lastLeafNumberId = this.heap[lastLeafNumberIndex];
    const lastLeafNumber = this.getValue(lastLeafNumberId);

    if (!index) {
      return;
    }

    // replace this node with the last leaf
    this.heap[index] = lastLeafNumberId;
    this.heap[lastLeafNumberIndex] = id;

    // delete last leaf now
    this.heap.length = this.heap.length - 1;
    // now we need to do heapify
    this.compareAndMoveDown(index);
  }

  deleteMin() {
    const rootIndex = 0;
    const rootNumberId = this.heap[rootIndex];
    const rootNumber = this.getValue(rootNumberId);
    const lastLeafNumberIndex = this.heap.length - 1;
    const lastLeafNumberId = this.heap[lastLeafNumberIndex];
    const lastLeafNumber = this.getValue(lastLeafNumberId);
    // replace root with the last leaf
    this.heap[rootIndex] = lastLeafNumberId;
    this.heap[lastLeafNumberIndex] = rootNumberId;
    // delete last leaf now
    this.heap.length = this.heap.length - 1;
    // now we need to do heapify
    this.compareAndMoveDown(rootIndex);
    return rootNumber;
  }

  compareAndMoveDown(index) {
    const parentId = this.heap[index];
    const parent = this.getValue(parentId);
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    const lChildId = this.heap[leftChildIndex];
    const lChild = this.getValue(lChildId);
    const rChildId = this.heap[rightChildIndex];
    const rChild = this.getValue(rChildId);

    const lChildIsSmaller = lChild < parent;
    if (lChildIsSmaller) {
      // swap them
      this.heap[leftChildIndex] = parentId;
      this.heap[index] = lChildId;
      this.compareAndMoveDown(leftChildIndex);
      return;
    }

    const rChildIsSmaller = rChild < parent;
    if (rChildIsSmaller) {
      // swap them
      this.heap[rightChildIndex] = parentId;
      this.heap[index] = rChildId;
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

const hashmap = {
  qui_cupidatat_aute_fugiat_mollit_dolore_pariatur_et_culpa_magnabc: 3,
  temabc: 5,
  veniam_irure_do_sint_abc: -2,
  proident_laboris_elit_in_commodo_fugiat_eu_eabc: 6,
  non_minim_reprehenderit_quis_nabc: 23,
  deserunabc: 04,
  occaecat_est_excepteur_dolore_sunt_consequat_consequat_deserunt_anim_lorem_desabc: 2,
  iabc: 33,
  do_sunt_enim_proident_ullamco_minimabc: 5,
};

const minheapObj = new MinHeapForObjects(hashmap);

minheapObj.insert({
  id: 'qui_cupidatat_aute_fugiat_mollit_dolore_pariatur_et_culpa_magnabc',
});
minheapObj.insert({ id: 'temabc' });
minheapObj.insert({ id: 'veniam_irure_do_sint_abc' });
minheapObj.insert({ id: 'proident_laboris_elit_in_commodo_fugiat_eu_eabc' });
minheapObj.insert({ id: 'non_minim_reprehenderit_quis_nabc' });
minheapObj.insert({ id: 'deserunabc' });
minheapObj.insert({
  id:
    'occaecat_est_excepteur_dolore_sunt_consequat_consequat_deserunt_anim_lorem_desabc',
});
minheapObj.insert({ id: 'iabc' });
minheapObj.insert({ id: 'do_sunt_enim_proident_ullamco_minimabc' });
minheapObj.log();
hashmap.temabc = -333;
minheapObj.modified('temabc');
minheapObj.log();
