function merge_intersect_union_distinct_twoSortedArray(array1, array2) {
  // each array will have a counter
  // we will compare each index of both arrays with each other
  // if one is shorter we will increment its index
  // must see visual representation at https://youtu.be/TzeBrDU-JaY?t=151

  let i = 0;
  let j = 0;
  const intersection = [];
  const union = [];
  const distinct = [];
  const joined = [];
  while (i < array1.length && j < array2.length) {
    if (array1[i] < array2[j]) {
      joined.push(array1[i]);
      union.push(array1[i]);
      distinct.push(array1[i]);
      i++;
    } else if (array1[i] > array2[j]) {
      joined.push(array2[j]);
      union.push(array2[j]);
      distinct.push(array2[j]);
      j++;
    } else {
      // elems in both arrays are equal
      intersection.push(array1[i]);
      joined.push(array1[i]);
      union.push(array1[i]);
      joined.push(array1[i]);
      i++;
      j++;
    }
  }
  // if any item in 1st  list is left
  while (i < array1.length) {
    joined.push(array1[i]);
    distinct.push(array1[i]);
    union.push(array1[i]);
    i++;
  }
  // if any item in 2nd list is left
  while (j < array2.length) {
    joined.push(array2[j]);
    distinct.push(array2[j]);
    union.push(array2[j]);
    j++;
  }

  return {
    merge: joined,
    intersection: intersection,
    union,
    distinct
  };
}
