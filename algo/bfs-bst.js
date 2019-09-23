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
  Array.prototype.enqueue = Array.prototype.push;
  Array.prototype.dequeue = Array.prototype.shift;
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


// the logic is traverse one of the node back to root and store a hashmap of the node
// in its path.
// while traversing the nodeB back to root on every jump to a prent check if that parent was present in the
// path of nodeA by using that hashmap.
// Todo Recusrive Implementation
BST.prototype.lowestCommonAncestor = function(nodeA, nodeB) {
  let parent = nodeA.parent;
  const hash = {};
  while (parent) {
    hash[parent.value] = parent;
    parent = parent.parent;
  }
  let secondParent = nodeB.parent;
  while (secondParent) {
    if (hash[secondParent.value]) {
      return hash[secondParent.value].value;
    }
    secondParent = secondParent.parent;
  }
  return null;
};


BSTNode.prototype.reverseTraverseBFS = function() {
  let queue = [];
  const stack = [];
  queue.push(this);
  while (queue.length !== 0) {
    // console.log(queue.map(n => n.value)); // enable for debug
    const current = queue.dequeue();
    stack.push(' ' + current.value + '');
    current.leftChild && queue.enqueue(current.leftChild);
    current.rightChild && queue.enqueue(current.rightChild);
  }

  let str = '';
  while(stack.length !== 0) {
    let val = stack.pop();
    str += val;
  }
  console.log(str);
  
};



BSTNode.prototype.compare = function(node) {
  // check value of this node === argument node
    // if not match return false
  // check if this node has a leftChild and argument node too
    // if both dont have a leftChild return false
    // if both have then ask the leftchild node to compare with the left child of argument node
  // check if this node has a rightChild and argument node too
    // if both dont have a rightChild return false
    // if both have then ask the rightchild node to compare with the right child of argument node

   let isEqual = true;
   // checking the center node values are same
   if (this.value !== node.value) {
     isEqual = false;
   }
   if(!isEqual) {
     return isEqual;
   }

   // checking if both dont have a left child
   if(!this.leftChild && !node.leftChild) {
     isEqual = true;
   }

   // checking if both has a left child (recursive)
   if(this.leftChild && node.leftChild) {
     isEqual = this.leftChild.compare(node.leftChild);
   }

   if(!isEqual) {
     return isEqual;
   }

  // if one of them has a left and other doesnt
   if((this.leftChild && !node.leftChild) || (!this.leftChild && node.leftChild)) {
     isEqual = false;
   }

   if(!isEqual) {
     return isEqual;
   }


   // checking if both dont have a left child
   if(!this.rightChild && !node.rightChild) {
     isEqual = true;
   }

   // checking if both has a left child (recursive)
   if(this.rightChild && node.rightChild) {
     isEqual = this.rightChild.compare(node.rightChild);
   }

   if(!isEqual) {
     return isEqual;
   }

  // if one of them has a left and other doesnt
   if((this.rightChild && !node.rightChild) || (!this.rightChild && node.rightChild)) {
     isEqual = false;
   }

  
   return isEqual;

};


BSTNode.compareSmaller = function(nodea, nodeb) {
  let isEqual = true;

  // if both are null
  if (nodea === nodeb) {
    return true;
  }

  // IF ONE IS null and one isnt
  if ((!nodea && nodeb) || (nodea && !nodeb)) {
    return false;
  }

  if (nodea.value !== nodeb.value) {
    return false;
  }
  if (nodea.value === nodeb.value) {
    isEqual = true;
  }
  isEqual =
    BSTNode.compareSmaller(nodea.leftChild, nodeb.leftChild) &&
    BSTNode.compareSmaller(nodea.rightChild, nodeb.rightChild);
  return isEqual;
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
root.addNode(1800);
root.addNode(15);
root.addNode(7);
root.addNode(2);


const root2 = new BSTNode(1);
root2.addNode(120);
root2.addNode(1200);
root2.addNode(40);
root2.addNode(12);
root2.addNode(1800);
root2.addNode(15);
root2.addNode(7);
root2.addNode(2);

console.log(BSTNode.compareSmaller(root, root2));