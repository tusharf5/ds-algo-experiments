function selectionSort(arr) {
  const last = arr.length - 1;
  for (let i = 0; i =< last; i++) {
    let min = i;
    for (let j = i + 1; j <= last; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    if (i !== min) {
      let currElem = arr[i];
      let minElem = arr[min];
      arr[min] = currElem;
      arr[i] = minElem;
    }
  }

  return arr;
}
