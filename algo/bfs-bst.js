function BSTNode(value) {
  this.value = value;
  this.parent = null;
  this.leftChild = null;
  this.rightChild = null;
  this.repeat = 0;
}

Array.prototype.enqueue = Array.prototype.push;
Array.prototype.dequeue = Array.prototype.shift;


BSTNode.prototype.find = function(value) {

  // CONTROL FLOW
  // if value === current value
    // if yes stop and return
  // if value is less than current value
    // if a right node exists
      // then let the right node manage this
    // otherwise if a right node doesnt exist
      // return not found
  // if value is greater than current value
    // if a left node exists
      // then let the left node manage this
    // otherwise if a left node doesnt exist
      // return not found


   if (this.value === value) {
    return this;
   } else if (value > this.value) {
    if (this.rightChild) {
      return this.rightChild.find(value);
    } else {
      return null;
    }
  } else if (value < this.value) {
    if (this.leftChild) {
      return this.leftChild.find(value);
    } else {
      return null;
    }
  }


}

BSTNode.prototype.traverseBFS = function() {
  let queue = [];
  let str = '';
  queue.push(this);
  while (queue.length !== 0) {
    // console.log(queue.map(n => n.value)); // enable for debug 
    const current = queue.dequeue();
    str += ' ' + current.value + '';
    current.leftChild && queue.enqueue(current.leftChild);
    current.rightChild && queue.enqueue(current.rightChild);
  }
  console.log(str);
};



BSTNode.prototype.inOrderTraverse = function() {
  // what's the base condition, if there are no child nodes
  // then the recursive function won't be called
  if(this.leftChild) {
    this.leftChild.inOrderTraverse();
  }
  console.log(this.value);
  if(this.rightChild) {
    this.rightChild.inOrderTraverse();
  }
};


BSTNode.prototype.preOrderTraverse = function() {
  // what's the base condition, if there are no child nodes
  // then the recursive function won't be called
  console.log(this.value);  
  if(this.leftChild) {
    this.leftChild.preOrderTraverse();
  }
  if(this.rightChild) {
    this.rightChild.preOrderTraverse();
  }
};

BSTNode.prototype.postOrderTraverse = function() {
  // what's the base condition, if there are no child nodes
  // then the recursive function won't be called
  if(this.leftChild) {
    this.leftChild.postOrderTraverse();
  }
  if(this.rightChild) {
    this.rightChild.postOrderTraverse();
  }
  console.log(this.value);  
};


BSTNode.prototype.addNode = function(value) {
  // CONTROL FLOW
  // if value === current value
    // if yes stop and mark a duplicate
  // if value is less than current value
    // if a right node exists
      // then let the right node manage this
    // otherwise if a right node doesnt exist
      // make a new right node with this value
  // if value is greater than current value
    // if a left node exists
      // then let the left node manage this
    // otherwise if a left node doesnt exist
      // make a new left node with this value

  if (this.value === value) {
    ++this.repeat;
    return this;
  } else if (value > this.value) {
    if (this.rightChild) {
      return this.rightChild.addNode(value);
    } else {
      const newNode = new BSTNode(value);
      newNode.parent = this;
      this.rightChild = newNode;
      return newNode;
    }
  } else if (value < this.value) {
    if (this.leftChild) {
      return this.leftChild.addNode(value);
    } else {
      const newNode = new BSTNode(value);
      newNode.parent = this;
      this.leftChild = newNode;
      return newNode;
    }
  }
};

const root = new BSTNode(1);
root.addNode(120);
root.addNode(1200);
root.addNode(40);
root.addNode(12);
root.addNode(18);
root.addNode(15);
root.addNode(7);
root.addNode(2);


root.postOrderTraverse();
