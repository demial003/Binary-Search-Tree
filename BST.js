import { Node } from "./Node.js";
import { mergeSort } from "./MergeSort.js";

const BST = (arr) => {
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

  const prettyPrint = (node, prefix = "", isLeft = true) => {
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

  const swap = (succ, parent) => {};

  return { prettyPrint, root, insert, deleteItem };
};

const x = BST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

x.deleteItem(67);
x.insert(67);
x.insert(17);

x.prettyPrint(x.root);
