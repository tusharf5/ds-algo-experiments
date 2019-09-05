function binarySearch(sortedArray, numberToFind, addToIndex = 0) {
  const length = sortedArray.length;
  const middle =
    length === 1 ? 0 : length % 2 === 0 ? length / 2 : (length + 1) / 2;
  const numberAtMiddle = sortedArray[middle];
  if (numberAtMiddle === numberToFind) {
    return middle + addToIndex;
  } else if (numberAtMiddle !== numberToFind && length === 1) {
    return undefined;
  } else if (numberAtMiddle > numberToFind) {
    return (
      addToIndex + binarySearch(sortedArray.slice(0, middle), numberToFind, 0)
    );
  } else if (numberAtMiddle < numberToFind) {
    return (
      addToIndex +
      binarySearch(
        sortedArray.slice(middle, length),
        numberToFind,
        length - middle
      )
    );
  } else {
    return undefined;
  }
}
