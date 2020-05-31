const eFile = {
  depends: [],
  value: 'E File',
  id: 'e',
};

const dFile = {
  depends: [eFile],
  value: 'D File',
  id: 'd',
};

const cFile = {
  depends: [dFile],
  value: 'C File',
  id: 'c',
};

const bFile = {
  depends: [cFile, dFile],
  value: 'B File',
  id: 'b',
};

const aFile = {
  depends: [bFile, cFile, dFile],
  value: 'A File',
  id: 'a',
};

function resolveDependency(dep) {
  if (dep) {
    return dep;
  }

  return null;
}

function getDependencies(file) {
  return file.depends;
}

function createDepGraph(file, depGraph = {}) {
  const deps = getDependencies(file);
  if (!depGraph[file.id]) {
    depGraph[file.id] = [];
  }
  if (deps.length > 0) {
    deps.forEach((dep) => {
      const fileDependecy = resolveDependency(dep);
      createDepGraph(fileDependecy, depGraph);
      // only add if the dependecy was resolved
      if (fileDependecy) {
        // only add unique values
        if (!depGraph[file.id].find((d) => d === fileDependecy.id)) {
          depGraph[file.id].push(fileDependecy.id);
        }
      }
    });
  }
  return depGraph;
}

// { a: [ 'b', 'c' ], b: [ 'c' ], c: [ 'd' ], d: [] }
const graph = createDepGraph(aFile, {});

const result = {};


// Go to 'A'
  // If it has dependencies
    // For Each dependency
       // Resolve its dependencies (recursion)
       // Append the current node to the end of resolved deps
  // If it does not have dependency
    // Return that node     

function sortDependencies(graph, start) {
  if (graph[start].length <= 0) {
    return start;
  } else {
    const list = [];
    graph[start].forEach((dep) => {
      if (result[dep]) {
        return result[dep];
      }
      let res = sortDependencies(graph, dep);
      res = res + ' >> ' + start;
      list.push(res);
    });
    result[start] = list[0];
    // sort list
    return list[0];
  }
}

console.log(sortDependencies(graph, 'a'));

function merge_intersect_union_distinct_twoSortedArray(array1, array2) {
  // each array will have a counter
  // we will compare each index of both arrays with each other
  // if one is shorter we will increment its index
  // must see visual representation at https://youtu.be/TzeBrDU-JaY?t=151

  let i = 0;
  let j = 0;
  const intersection = [];
  const union = [];
  const distinct = [];
  const joined = [];
  while (i < array1.length && j < array2.length) {
    if (array1[i] < array2[j]) {
      joined.push(array1[i]);
      union.push(array1[i]);
      distinct.push(array1[i]);
      i++;
    } else if (array1[i] > array2[j]) {
      joined.push(array2[j]);
      union.push(array2[j]);
      distinct.push(array2[j]);
      j++;
    } else {
      // elems in both arrays are equal
      intersection.push(array1[i]);
      joined.push(array1[i]);
      union.push(array1[i]);
      joined.push(array1[i]);
      i++;
      j++;
    }
  }
  // if any item in 1st  list is left
  while (i < array1.length) {
    joined.push(array1[i]);
    distinct.push(array1[i]);
    union.push(array1[i]);
    i++;
  }
  // if any item in 2nd list is left
  while (j < array2.length) {
    joined.push(array2[j]);
    distinct.push(array2[j]);
    union.push(array2[j]);
    j++;
  }

  return {
    merge: joined,
    intersection: intersection,
    union,
    distinct
  };
}
