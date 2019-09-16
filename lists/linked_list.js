function LinkedListNode(value) {
  this.next = null;
  this.value = value;
  this.prev = null;
}

function LinkedList() {
  this.HEAD = null;
  this.TAIL = null;
}

LinkedList.prototype.addNode = function(value) {
  if (this.HEAD) {
    let currentNode = this.HEAD;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    const newNode = new LinkedListNode(value);
    currentNode.next = newNode;
    newNode.prev = currentNode;
    this.TAIL = newNode;
  } else {
    const newNode = new LinkedListNode(value);
    this.HEAD = newNode;
  }
};

LinkedList.prototype.traverse = function(value) {
  if (this.HEAD) {
    let currentNode = this.HEAD;
    while (currentNode) {
      console.log(currentNode.value);
      currentNode = currentNode.next;
    }
  }
};

// go through each node and check if the value that you are about to add is
// less than that node if yes then add that node prior to the current node
// also make sure if current node is a HEAD or a TAIL, you update those references as well.
// if none of the node satosfied that condition , then insert it as the tail.
LinkedList.prototype.addNodeSorted = function(value) {
  if (this.HEAD) {
    let currentNode = this.HEAD;
    while (currentNode) {
      if (value < currentNode.value) {
        const newNode = new LinkedListNode(value);
        newNode.next = currentNode;
        newNode.prev = currentNode.prev;
        if (currentNode.prev) {
          currentNode.prev.next = newNode;
        }
        currentNode.prev = newNode;
        if (this.HEAD === currentNode) {
          this.HEAD = newNode;
        }
        return;
      }
      currentNode = currentNode.next;
    }
    // new node is the tail
    const newNode = new LinkedListNode(value);
    newNode.prev = this.TAIL;
    this.TAIL.next = newNode;
    this.TAIL = newNode;
  } else {
    const newNode = new LinkedListNode(value);
    this.HEAD = newNode;
    this.TAIL = newNode;
  }
};

// create an empty linked list and traverse through the current one and keep
// on adding elements the empty linked list
LinkedList.prototype.clone = function() {
  if (this.HEAD) {
    const newLinkedList = new LinkedList();
    let currentNode = this.HEAD;
    while (currentNode) {
      newLinkedList.addNode(currentNode.value + 2);
      currentNode = currentNode.next;
    }
    return newLinkedList;
  } else {
    return new LinkedList();
  }
};

const linkedList = new LinkedList();

linkedList.addNodeSorted(8);
linkedList.addNodeSorted(7);
linkedList.addNodeSorted(6);
linkedList.addNodeSorted(2);
linkedList.addNodeSorted(19);
linkedList.addNodeSorted(1);
linkedList.addNodeSorted(5);

linkedList.traverse();
