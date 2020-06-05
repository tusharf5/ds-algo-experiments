const OrderStack = [];
const visitedSet = {};

const top_sort = function (graph, node) {
  if (visitedSet[node]) {
    return;
  }
  visitedSet[node] = true;
  if (graph[node]) {
    graph[node].forEach((child) => {
      top_sort(graph, child);
    });
  }
  OrderStack.push(node);
};

const top_sort_start = function (graph) {
  Object.keys(graph).forEach((node) => {
    top_sort(graph, node);
  });

  return OrderStack.join('');
};