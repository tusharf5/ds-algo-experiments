function printPossibleBinary(n, number, res) {
  // we'll start with []
  // the first could take two values either 0 or 1
  // we push 0 first and then 1
  if (number.length <= n) {
    //console.log(number.join(''));
    number.length && res.push(number.join(''));
    printPossibleBinary(n, number.concat(0), res);
    printPossibleBinary(n, number.concat(1), res);
  }
}
let res = [];
printPossibleBinary(5, [], res);
res.sort();
res.join(', ');
