let a = [];

let b = [];

let e = [];

let c = [];

let d = [];

a = [b, d];
b = [a, c, d];
c = [b, d, e];
d = [a, b, c, e];
e = [d, c];

a.next = b;
a.name = 'a';

b.next = c;
b.name = 'b';

c.next = e;
c.name = 'c';

e.next = d;
e.name = 'e';

d.next = null;
d.name = 'd';

const start = a;

const colorMap = {};

const colors = ['red', 'green', 'yellow'];

const debug = false;

function log() {
  debug && console.log(...arguments);
}

function colorNode(node) {
  if (!node) {
    log('Stopping at null node');
    return true;
  }
  if (colorMap[node.name]) {
    log('Color for', node.name.toUpperCase(), 'already exist');
    return true;
  }
  log('Coloring', node.name.toUpperCase());
  // assign color to a node
  // move to next node
  // assign a color
  for (let i = 0; i < colors.length; i++) {
    let color = colors[i];
    log(
      'Trying ',
      color.toUpperCase(),
      ' color for ',
      node.name.toUpperCase()
    );
    const canTakeColor = node.every(n => colorMap[n.name] !== color);
    if (!canTakeColor) {
      log(
        'Cannot take ',
        color.toUpperCase(),
        ' color for ',
        node.name.toUpperCase()
      );
      continue;
    }
    log(
      color.toUpperCase(),
      ' is the final color for ',
      node.name.toUpperCase()
    );
    colorMap[node.name] = color;
    //log(colorMap);
    const nextCanTake = colorNode(node.next);
    if (nextCanTake) {
      return true;
    } else {
      delete colorMap[node.name];
      continue;
    }
  }
  return false;
}

colorNode(start);

console.log(colorMap);
