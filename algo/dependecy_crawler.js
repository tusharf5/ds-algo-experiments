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
