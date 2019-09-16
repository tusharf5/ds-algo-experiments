function quick_sort(array) {
  // divide and conquer
  // we take a pivot
  // all left to pivot should be less than pivot
  // all right to pivot should be greater
  // sort the left array using quick sort
  // sort the right array using quick sort
  // quick_sort(leftArray) + pivot + quick_sort(rightArray)
  // this way you whole array will be sorted in nLogn in average case
  // base condition is that [1], [], are already sorted

  if (array.length < 2) {
    return array;
  }

  const pivot = Math.floor(0 + (array.length - 1 - 0) / 2);
  const leftArrray = [];
  const rightArrray = [];
  const pivots = [];
  // this add n
  array.forEach(el => {
    if (el > pivot) {
      rightArrray.push(el);
    } else if (el < pivot) {
      leftArrray.push(el);
    } else {
      pivots.push(el);
    }
  });

  // this add logn
  const sorted = quick_sort(leftArrray)
    .concat(pivots)
    .concat(quick_sort(rightArrray));
  return sorted;
}
