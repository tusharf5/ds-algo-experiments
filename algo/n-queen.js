function Position(row, column) {
  this.row = row;
  this.column = column;
}

Position.prototype.toString = function() {
  return '{' + this.row + ',' + this.column + '}';
};

function prettyPrint(positions) {
  let topStr = '';
  for (let row = 1; row <= n; row++) {
    topStr += '____';
  }
  console.log('', topStr);
  for (let row = 1; row <= n; row++) {
    let str = '';
    const whichColumn = positions.find(p => (p && p.row) === row);
    for (let col = 1; col <= n; col++) {
      if (whichColumn.column === col) {
        str += '|_Q_';
      } else {
        str += '|___';
      }
    }
    str += '|';
    console.log(str);
  }
}

function isSafe(boardSize, enemy, target) {
  let row = enemy.row;
  let column = enemy.column;

  if (row === target.row) {
    return false;
  }

  if (column === target.column) {
    return false;
  }

  while (row <= boardSize && column <= boardSize) {
    if (row === target.row && column === target.column) {
      return false;
    }
    row += 1;
    column += 1;
  }

  row = enemy.row;
  column = enemy.column;

  while (row <= boardSize && column >= 1) {
    if (row === target.row && column === target.column) {
      return false;
    }
    row += 1;
    column -= 1;
  }

  return true;
}

function nQueen(n) {
  const positions = [];
  const hasSolution = solveNQueen(n, 1, positions);
  if (hasSolution) {
    prettyPrint(positions);
  } else {
    console.log(n, ' > ', 'No Solution');
  }
}

// this function is recursively called for each row to place a queen on that row
// this function loops over each column of that row and see if that column is safe
// if safe it calls for the next row
function solveNQueen(numOfQueens, currentRow, positions) {
  if (currentRow > numOfQueens) {
    return true;
  }

  for (let col = 1; col <= numOfQueens; col++) {
    // try queen at current column
    // check if it is safe
    let isQueenSafe = true;

    // loops through each previous queen
    for (let queen = 1; queen < currentRow; queen++) {
      // Queen at (1,5) can attack -> every one at 1st row
      //                           -> every on at 5th column
      //                           -> (2,6), (3,7), (4,8) // forward diagonal attack (+1 row, +1 column) till we reach end of row and column
      //                           -> (2,4), (3,3), (4,2), (5,1) // backward diagonal attack (-1 row, -1 column) till we reach end of row and column

      // Queen at (3,3) can attack -> every one at 3rd row
      //                           -> every on at 3rd column
      //                           -> (4,4), (5,5), (6,6), (7,7), (8,8)
      //                           -> (2,2), (1,1)

      if (
        !isSafe(numOfQueens, positions[queen], { row: currentRow, column: col })
      ) {
        isQueenSafe = false;
        break;
      }
    }
    // IF SAFE
    // save position for current queen at this column
    if (isQueenSafe) {
      positions[currentRow] = new Position(currentRow, col);
      // recursively solve for subsequent queens
      const nextQueenHasSolution = solveNQueen(
        numOfQueens,
        currentRow + 1,
        positions
      );
      if (nextQueenHasSolution) {
        return true;
      }
    }
  }

  // IF NONE OF THE ABOVE RETURNED TRUE THEN RETURN FALSE
  return false;
}

nQueen(4);
