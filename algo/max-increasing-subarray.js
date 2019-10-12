// As we iterate through the set
// we keep track of what is locally the desired result

// like if we are tracking max number of increasing elements in a subset
// as we go though the items in the array there could be many subsets
// in the example below there are 4 such subsets in this array

// [100,200,300,50,51,52,53,55,56,30,31,32,33,34,35,1,2,3,4,5,6]
// [100,200,300] | [50,51,52,53,55,56] | [30,31,32,33,34,35] | [1,2,3,4,5,6]
// the trick is we track two variables one is our globalMax and one is localMax

// the local one is always counting the current subset and global one counts the maximum subset
// the condition is the subset needs to be in increasing order

// as we first move to 100 we update the "local max increasing subset" [o to 0]
// everytime we update the local we check if it is greater than the global max
// if yes we update the global too if no we move on.

// we move to 200, checks the condition, 200 > 100 ✅, update the localMax [0 to 1] ✅
// check if local is greater than global, yes ✅ global is [0 to 0]  so we update the global to [0 to 1] ✅,

// we move to 300, checks the condition, 300 > 200 ✅, update the localMax [0 to 2] ✅
// check if local is greater than global, yes ✅ global is [0 to 1]  so we update the global to [0 to 2] ✅,

// we move to 50, hecks the condition, 50 > 300 ❌, reset the local to start from [3 to 3] ✅
// check if local is greater than global, no ❌ global is [0 to 2] (2 length) local is [3 to 3] (0 length), so we dont ❌ update the global

// this way at the end we will have our globalMax with the maximum satisfying value

function maxIncreasingArray(array) {
  // lowerIndex, upperIndex
  let globalMax = [0, 0];
  // lowerIndex, upperIndex
  let localMax = [0, 0];

  for (let i = 1; i < array.length; i++) {
    if (array[i] > array[i - 1]) {
      localMax[1] = i;
      if (localMax[1] - localMax[0] > globalMax[1] - globalMax[0]) {
        globalMax[0] = localMax[0];
        globalMax[1] = localMax[1];
      }
    } else {
      localMax[0] = i;
      localMax[1] = i;
    }
  }

  return array.slice(globalMax[0], globalMax[1] + 1);
}

maxIncreasingArray([
  100,
  200,
  300,
  50,
  51,
  52,
  53,
  55,
  56,
  30,
  31,
  32,
  33,
  34,
  35,
  1,
  2,
  3,
  4,
  5,
  6
]);

function longestSubsting(string) {
  const globalLong = [0, 0];
  const localLong = [0, 0];

  for (let i = 1; i < string.length; i++) {
    if (string[i] !== string[i - 1]) {
      localLong[1] = i;
      if (localLong[1] - localLong[0] > globalLong[1] - globalLong[0]) {
        globalLong[0] = localLong[0];
        globalLong[1] = localLong[1];
      }
    } else {
      localLong[0] = i;
      localLong[1] = i;
    }
  }

  return string.substr(globalLong[0], globalLong[1] - globalLong[0]);
}

longestSubsting('abrkaabcdefghijjxxx');

// todo Longest Increasing subarray with one change allowed
// todo Length of longest increasing circular subarray
// todo Largest sum contiguous increasing subarray
// todo Find Maximum Sum Strictly Increasing Subarray
// todo Longest Increasing Subsequence | DP-3
// todo Longest Increasing Odd Even Subsequence
// todo Longest Increasing Subsequence Size (N log N)
// todo Construction of Longest Increasing Subsequence (N log N)
// todo Longest Increasing consecutive subsequence
// todo Longest Common Increasing Subsequence (LCS + LIS)
// todo Printing longest Increasing consecutive subsequence
// todo Longest Monotonically Increasing Subsequence Size (N log N): Simple implementation
// todo Longest subarray with sum divisible by k
// todo Longest subarray such that the difference of max and min is at-most one
// todo Longest subarray having maximum sum
