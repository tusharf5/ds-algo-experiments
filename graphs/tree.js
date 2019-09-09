function TreeNode(value) {
  this.children = [];
  this.data = value;
  this.parent = null;
}

TreeNode.prototype.addNode = function(value) {
  const newNode = new TreeNode(value);
  newNode.parent = this;
  this.children[this.children.length] = newNode;
};

TreeNode.prototype.traverse = function(traversal = '') {
  this.children.forEach(function(child) {
    traversal = traversal + child.data + ' > ' + child.traverse();
  });
  return traversal;
};

TreeNode.prototype.traverseBFG = function() {
  let queue = this.children.concat();
  let traversalString = '';
  while (queue.length !== 0) {
    const current = queue.shift();
    traversalString = traversalString + current.data  + ' > ';
    queue = queue.concat(current.children);
  }
  return traversalString;
};

TreeNode.prototype.find = function(value) {
  let queue = this.children.concat();
  let found;
  while (queue.length !== 0) {
    const current = queue.shift();
    if ((current.data = value)) {
      found = current;
      break;
    }
    queue = queue.concat(current.children);
  }
  return found;
};

TreeNode.prototype.depth = function() {
  if (this.parent === null) {
    return 1;
  }
  return 1 + this.parent.depth();
};

TreeNode.prototype.height = function() {
  if (this.children.length === 0) {
    return 0;
  }
  const pathValues = this.children.map(function(child) {
    return 1 + child.height();
  });
  return Math.max(...pathValues);
};

const root = new TreeNode(1);

root.addNode(2);
root.addNode(3);
root.addNode(4);

root.children[0].addNode(5);
root.children[1].addNode(6);
root.children[2].addNode(7);

root.children[1].children[0].addNode(8);
root.children[1].children[0].children[0].addNode(9);

//root.traverseBFG()
console.log('Height is > ', root.height());
console.log('Depth is > ', root.children[1].children[0].children[0].depth());
console.log('BFS Traversal is > ', root.traverseBFG());
console.log('DFS Traversal is > ', root.traverse());
