import { Node } from "./Node.js";
import { mergeSort } from "./MergeSort.js";

function BST(arr) {
  const parseArray = (arr) => {
    return [...new Set(arr)];
  };

  const buildTree = (array) => {
    if (array.length === 0) {
      return null;
    }

    let mid = Math.floor(array.length / 2);
    let root = Node(array[mid]);
    let left = array.slice(0, mid);
    let right = array.slice(mid + 1, array.length);

    root.left = buildTree(left);
    root.right = buildTree(right);

    return root;
  };

  let root = buildTree(parseArray(mergeSort(arr)));

  const getRoot = () => root;

  const prettyPrint = (node = root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const insert = (value) => {
    let newNode = Node(value);
    let curr = root;
    let parent = null;

    while (curr) {
      parent = curr;
      if (newNode.data <= curr.data) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }
    if (value <= parent.data) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }
    return curr;
  };

  const deleteItem = (value) => {
    let target = root;
    let parent = null;

    while (target && target.data !== value) {
      parent = target;
      if (value <= target.data) {
        target = target.left;
      } else {
        target = target.right;
      }
    }

    let succ;

    if (target.right) {
      succ = target.right;
    } else {
      succ = target;
    }

    while (succ !== null && succ.left !== null) {
      parent = succ;
      succ = succ.left;
    }

    if (target.left || target.right) {
      target.data = succ.data;
    }
    if (parent.left.data === succ.data) {
      parent.left = null;
    } else {
      parent.right = null;
    }
  };

  const levelOrderForEach = (callback) => {
    if (callback === undefined || typeof callback !== "function") {
      throw new Error("Must pass callback as a parameter");
    }
    if (root === null) return;
    let curr = root;
    let q = [];
    q.push(curr);

    while (q.length > 0) {
      curr = q.shift();
      callback(curr);
      if (curr.left !== null) q.push(curr.left);
      if (curr.right !== null) q.push(curr.right);
    }
  };

  const inOrder = (callback, node = root) => {
    if (node === null) return;
    inOrder(callback, node.left);
    callback(node);
    inOrder(callback, node.right);
  };

  const preOrder = (callback, node = root) => {
    if (node === null) return;
    callback(node);
    preOrder(callback, node.left);
    preOrder(callback, node.right);
  };

  const postOrder = (callback, node = root) => {
    if (node === null) return;
    postOrder(callback, node.left);
    postOrder(callback, node.right);
    callback(node);
  };

  const find = (value) => {
    let target = root;
    while (target && target.data !== value) {
      if (value <= target.data) {
        target = target.left;
      } else {
        target = target.right;
      }
    }
    return target;
  };

  const height = (value) => {
    let l = find(value);
    let r = find(value);
    let leftCount = 0;
    let rightCount = 0;
    if (l === null) return 0;
    while (l.left) {
      l = l.left;
      ++leftCount;
    }

    while (r.right) {
      r = r.right;
      ++rightCount;
    }

    if (rightCount > leftCount) return rightCount;
    return leftCount;
  };

  const depth = (value) => {
    let target = root;
    let count = 0;
    while (target && target.data !== value) {
      if (value <= target.data) {
        target = target.left;
      } else {
        target = target.right;
      }
      ++count;
    }
    if (target !== null) return count;
    return null;
  };

  const rebalance = () => {
    let res = [];
    inOrder((curr) => {
      res.push(curr.data);
    });

    root = buildTree(res);
  };

  const isBalanced = () => {
    if (root === null) return true;
    let balance = true;
    levelOrderForEach((curr) => {
      if (!balance) return;
      if (curr.left) {
        if (curr.right) {
          if (Math.abs(height(curr.left.data) - height(curr.right.data)) > 1)
            balance = false;
        }
      }
    });
    return balance;

    if (root === null) return true;
    let lHeight = null;
    let rHeight = null;
    lHeight = height(root.left.data);
    rHeight = height(root.right.data);
    if (Math.abs(rHeight - lHeight) > 1) return false;
    return isBalanced(root.left) && isBalanced(root.right);
    console.log(lHeight, rHeight);
  };

  return {
    prettyPrint,
    getRoot,
    insert,
    deleteItem,
    inOrder,
    levelOrderForEach,
    preOrder,
    postOrder,
    find,
    depth,
    rebalance,
    height,
    isBalanced,
  };
}

const x = BST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

x.prettyPrint();
console.log(x.isBalanced());
