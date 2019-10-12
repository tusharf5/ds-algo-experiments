function generateNBinary(number, array) {
  if (array.length === number + 1) {
    // we need to stop
    return;
  }
  // append 0 onto the array
  // build a subtree on that
  array.length && console.log(array.join(''));
  generateNBinary(number, [].concat(array).concat(0));
  // append 1 onto the array
  // build a subtree on that
  generateNBinary(number, [].concat(array).concat(1));
}

generateNBinary(10, []);
