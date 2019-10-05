const hash = {};

// Dynamic Programming
function isPalindrome(string, start, end) {
  if (hash[string]) {
    if (hash[string][start]) {
      if (hash[string][start][end]) {
        return hash[string][start][end];
      }
    }
    if (hash[string][end]) {
      if (hash[string][end][start]) {
        return hash[string][end][start];
      }
    }
  }

  let result = false;
  if (string[start] === string[end]) {
    result = true;
  }

  if (hash[string]) {
    if (hash[string][start]) {
      hash[string][start][end] = result;
    } else {
      hash[string][start] = {};
    }
  } else {
    hash[string] = {};
  }

  return result;
}

function longestParenthesis(string, start, end) {
  let global = [0, 0];
  for (let i = start; i < end; i++) {
    const left = isPalindrome(string, i, end);
    if (left) {
      if (end - i > global[1] - global[0]) {
        global[0] = i;
        global[1] = end;
      }
    }
    for (let j = end; j > start; j--) {
      const right = isPalindrome(string, i, j);
      if (right) {
        if (j - i > global[1] - global[0]) {
          global[0] = i;
          global[1] = j;
        }
      }
    }
  }

  return string.substr(global[0], global[1] - global[0] + 1);
}

console.log(longestParenthesis('million', 0, 6));
console.log(longestParenthesis('tracecars', 0, 8));
console.log(longestParenthesis('banana', 0, 5));
