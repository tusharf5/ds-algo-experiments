function bubbleSort(arr) {
  const last = arr.length - 1;
  for (let i = 0; i <= last; i++) {
    // for each loop we only need to move till the element till which 
    // the list is not sorted yet because each operation will put the max element at its right place at the end
    for (let j = 0; j <= last - i; j++) {
      let curr = arr[j];
      let next = arr[j + 1];
      if (curr > next) {
        arr[j + 1] = curr;
        arr[j] = next;
      }
    }
  }
  return arr;
}
