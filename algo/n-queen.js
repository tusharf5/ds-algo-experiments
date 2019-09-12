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
    let isSafe = true;

    // loops through each previous queen
    for (let queen = 1; queen < currentRow; queen++) {
      //if a previous queen is on the same column
      if (positions[queen].column === col) {
        isSafe = false;
        break;
      }
      // if prev quuen row - prev queen col = curr quuen row - curr queen col
      if (positions[queen].row - positions[queen].column === currentRow - col) {
        isSafe = false;
        break;
      }
      // if prev quuen row + prev queen col = curr quuen row + curr queen col
      if (positions[queen].row + positions[queen].column === currentRow + col) {
        isSafe = false;
        break;
      }
    }
    // IF SAFE
    // save position for current queen at this column
    if (isSafe) {
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

nQueen(8);
