const treasureMap = {
  '00': 0,
  '01': 0,
  '02': 0,
  '03': 0,
  '10': -1,
  '11': 0,
  '12': -1,
  '13': 0,
  '20': 0,
  '21': 0,
  '22': 0,
  '23': 0,
  '30': 1,
  '31': -1,
  '32': -1,
  '33': 0,
};

const visited = {};

function isTreasure(x, y) {
  return treasureMap[x + '' + y] === 1;
}

function isOnTheMap(x, y) {
  if (x < 0 || x > 3 || y < 0 || y > 3) {
    return false;
  }
  return true;
}

function markVisited(x, y) {
  visited[x + '' + y] = true;
}

function isVisited(x, y) {
  return visited[x + '' + y] === true;
}

function isSafe(x, y) {
  return treasureMap[x + '' + y] === 0 || treasureMap[x + '' + y] === 1;
}

function findTreasure(startX, startY) {

  markVisited(startX, startY);

  if (isTreasure(startX, startY)) {
    return [startX, startY];
  }

  console.log(startX, startY);

  const path = [];

  // move right if right is on the map and safe and not visited
  if (
    isOnTheMap(startX, startY + 1) &&
    isSafe(startX, startY + 1) &&
    !isVisited(startX, startY + 1)
  ) {
    console.log('Moving Right');
    const pathArray = findTreasure(startX, startY + 1);
    
    if (pathArray.length > 0) {
      path.push([startX, startY]);
      path.push(pathArray)
    }
  }

  // move bottom if bottom is on the map and safe and not visited
  if (
    isOnTheMap(startX + 1, startY) &&
    isSafe(startX + 1, startY) &&
    !isVisited(startX + 1, startY)
  ) {
    console.log('Moving Bottom');
    const pathArray = findTreasure(startX + 1, startY);
    if (pathArray.length > 0) {
      path.push([startX, startY]);
      path.push(pathArray)
    }
  }

  // move top if top is on the map and safe and not visited
  if (
    isOnTheMap(startX - 1, startY) &&
    isSafe(startX - 1, startY) &&
    !isVisited(startX - 1, startY)
  ) {
    console.log('Moving Top');
    const pathArray = findTreasure(startX - 1, startY);
    if (pathArray.length > 0) {
      path.push([startX, startY]);
      path.push(pathArray)
    }
  }

  // move left if left is on the map and safe and not visited
  if (
    isOnTheMap(startX, startY - 1) &&
    isSafe(startX, startY - 1) &&
    !isVisited(startX, startY - 1)
  ) {
    console.log('Moving Left');
    const pathArray = findTreasure(startX, startY - 1);
    if (pathArray.length > 0) {
      path.push([startX, startY]);
      path.push(pathArray)
    }
  }

  return path;
}

console.log(JSON.stringify(findTreasure(0, 0)));
