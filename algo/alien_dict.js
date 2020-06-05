const alien = ['wrt', 'wrf', 'er', 'ett', 'rftt'];
//const alien = ["z","x"];

// from "wrt"and"wrf" ,we can get 't'<'f'
// from "wrt"and"er" ,we can get 'w'<'e'
// from "er"and"ett" ,we can get 'r'<'t'
// from "ett"and"rftt" ,we can get 'e'<'r'
// wertf

// fetr

const map = {};

function setChild(letter, child) {
  if (map[letter]) {
    const alreadyHas = map[letter].find((d) => d === child);
    if (!alreadyHas) {
      map[letter].push(child);
    }
  } else {
    map[letter] = [child];
  }
}

for (let i = 0; i < alien.length - 1; i++) {
  const firstAlienWord = alien[i];
  const nextAlienWord = alien[i + 1];
  for (let fwl = 0; fwl < firstAlienWord.length; fwl++) {
    const firstWordLetter = firstAlienWord[fwl];
    const secondWordLetter = nextAlienWord[fwl];
    if (!secondWordLetter) {
      continue;
    }
    if (firstWordLetter === secondWordLetter) {
      continue;
    }
    setChild(firstWordLetter, secondWordLetter);
  }
}

// topologically sort map to get answer
console.log(map);

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

console.log(top_sort_start(map));
