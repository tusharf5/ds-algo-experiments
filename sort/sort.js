/**
 * Finds a pivot which is a randomly selected element.
 * All elements smaller or equal than that are moved to a new array on the left of it.
 * CONQUER - All elements greater than that are moved to a new array on the right of it.
 * So that element is now in the correct place.
 * DIVIDE - This process is repeated for each sub array.
 * COMBINE - The left sub array is combined with the pivot and the right one.
 * BASE - There is either one or no element in the array.
 * @param {Array} inputArray
 */
function quickSortLikeChromeAsItEatsALotOfRam(inputArray) {
  if (inputArray.length === 0) {
    return inputArray;
  }

  if (inputArray.length === 1) {
    return inputArray;
  }

  // new arrays for each sort :- BAD
  let leftSubarray = [];
  let rightSubarray = [];
  let pivot = Math.floor((inputArray.length - 1) / 2);
  let middleArray = [];

  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i] < inputArray[pivot]) {
      leftSubarray.push(inputArray[i]);
    } else if (inputArray[i] > inputArray[pivot]) {
      rightSubarray.push(inputArray[i]);
    } else {
      middleArray.push(inputArray[i]);
    }
  }

  return quickSort(leftSubarray)
    .concat(middleArray)
    .concat(quickSort(rightSubarray));
}

/**
 * Bubbles up the max element to the last in every iteration
 * @param {Array} inputArray
 * @returns {Array}
 */
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

/**
 * Merge sort is also divide, conquer & combine algorithm.
 * CONQUER - You find a pivot. You split the array in two parts from that pivot.
 * DIVIDE - You keep on doing this until the two parts have just one element each.
 * BASE - When the splitted array has just one element, it does not need further splitting.
 * COMBINE - Now you have two arrays that are sorted and you have to combine them to make a new sorted array.
 * @param {Array} inputArray 
 */
function mergeSort(inputArray) {


  if(inputArray.length === 1) {
    return inputArray;
  }

  let pivot = Math.floor((inputArray.length - 1) / 2);

  const sortedLeft = mergeSort(inputArray.slice(0, pivot));
  const sortedRight = mergeSort(inputArray.slice(pivot));
  const merged = [];

  const biggerOne = sortedLeft.length > sortedRight.length ? sortedLeft : sortedRight;

  for(let i=0; i < biggerOne.length ; i++) {

    if(i < sortedLeft.length && i < sortedRight.length) {
      if(sortedLeft[i] < sortedRight[i]) {
        merged.push(sortedLeft[i]);
      }
    }

  }


}

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
// console.log(bubbleSort(arrayToSort));
console.log(quickSort(arrayToSort));
