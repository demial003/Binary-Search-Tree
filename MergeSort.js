const merge = (left, right) => {
  let i = 0;
  let j = 0;
  let res = [];

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      res.push(left[i]);
      i++;
    } else {
      res.push(right[j]);
      j++;
    }
  }

  res = res.concat(left.slice(i, left.length));

  res = res.concat(right.slice(j, right.length));

  return res;
};

const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;
  let mid = arr.length / 2;
  let left = arr.slice(0, mid);
  let right = arr.slice(mid, arr.length);

  return merge(mergeSort(left), mergeSort(right));
};

export { mergeSort };
