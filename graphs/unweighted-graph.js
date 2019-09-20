function GraphNode(value) {
  this.neighbours = [];
  this.value = value;
}

GraphNode.prototype.addNeighbour = function(value) {
  if (value instanceof GraphNode) {
    this.neighbours.push(value);
    return;
  }
  const neighBour = new GraphNode(value);
  this.neighbours.push(neighBour);
  return neighBour;
};

function Graph(node) {
  this.START = node;
}

Graph.prototype.bfsTraverse = function() {
  let queue = [this.START];
  const visited = new Map();
  while (queue.length !== 0) {
    const node = queue.shift();
    if (visited.has(node)) {
      continue;
    }
    console.log(node.value);
    visited.set(node, true);
    queue = queue.concat(node.neighbours);
  }
};

//1 --> 2
//2 ---> 3,4
//3 ---> 3,5
//4 ---> 5
const root = new GraphNode(1);
const second = root.addNeighbour(2);
const third = second.addNeighbour(3);
const fourth = root.addNeighbour(4);
const fifth = fourth.addNeighbour(5);
third.addNeighbour(fifth);
third.addNeighbour(third);
second.addNeighbour(fourth);

const graph = new Graph(root);

graph.bfsTraverse();
