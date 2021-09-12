function BSTNode(data, depth) {
  this.count = 1;
  this.data = data;
  this.depth = depth;
  this.leftChild = null;
  this.rightChild = null;
}

function BST() {
  this.root = null;
}

BST.prototype.add = function add(value) {
  if (this.root) {
    this.root.add(value, 0);
  } else {
    this.root = new BSTNode(value, 0);
  }
};

BST.prototype.traverse = function traverse(value) {
  const order = [];
  if (this.root) {
    this.root.traverse(order);
  }

  return order;
};

BSTNode.prototype.traverse = function traverse(arr) {
  if (this.leftChild) {
    this.leftChild.traverse(arr);
  }

  arr.push({ value: this.data, depth: this.depth });

  if (this.rightChild) {
    this.rightChild.traverse(arr);
  }
};

BSTNode.prototype.add = function add(value, depth) {
  if (value < this.data) {
    if (this.leftChild) {
      this.leftChild.add(value, depth + 1);
    } else {
      this.leftChild = new BSTNode(value, depth + 1);
    }
  } else if (value > this.data) {
    if (this.rightChild) {
      this.rightChild.add(value, depth + 1);
    } else {
      this.rightChild = new BSTNode(value, depth + 1);
    }
  } else {
    this.count++;
  }
};

const bst = new BST();

bst.add(10);
bst.add(5);
bst.add(14);
bst.add(9);
bst.add(11);
bst.add(1);
bst.add(12);
bst.add(6);

console.log(bst.traverse());
