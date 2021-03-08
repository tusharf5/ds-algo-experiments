function quickSort() {}

function bubbleSort(inputArray) {
  // first loop to keept a track of two sub arrays
  for (let j = 0; j < inputArray.length; j++) {
    // second loop to iterate the un-sorted subarray and find the maximum
    for (let k = 1; k < inputArray.length - j; k++) {
      if (inputArray[k - 1] > inputArray[k]) {
        let bigger = inputArray[k - 1];
        inputArray[k - 1] = inputArray[k];
        inputArray[k] = bigger;
      }
    }
  }
  return inputArray;
}

/**
 * Select smallest and put it in another array at the correct location.
 * @param {Array} inputArray Array to sort
 */
function selectionSort(inputArray) {
  // first loop to keept a track of two sub arrays
  for (let j = 0; j < inputArray.length; j++) {
    let smallestIndex = j;
    // second loop to iterate the un-sorted subarray and find the minimumm
    for (let k = j + 1; k < inputArray.length; k++) {
      if (inputArray[k] < inputArray[smallestIndex]) {
        smallestIndex = k;
      }
    }
    let smallest = inputArray[smallestIndex];
    inputArray[smallestIndex] = inputArray[j];
    inputArray[j] = smallest;
  }
  return inputArray;
}

function mergeSort() {}

const arrayToSort = [
  3,
  6,
  1,
  8,
  1,
  8,
  3,
  8,
  2,
  0,
  6,
  1,
  8,
  3,
  -7,
  6,
  8,
  4,
  3,
  7,
  1,
  31,
  9,
  3,
];

// console.log(selectionSort(arrayToSort))
console.log(bubbleSort(arrayToSort))
