import { Node } from "./Node.js";

const BST = (arr) => {
  const buildTree = (array) => {
    if (array.length === 1) return Node(array[0]);

    let mid = Math.floor(array.length / 2);
    let root = Node(array[mid]);
    let left = array.slice(0, mid);
    let right = array.slice(mid + 1, array.length);
    root.left = buildTree(left);
    root.right = buildTree(right);

    return root;
  };

  let root = buildTree(arr);

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

  return { prettyPrint, root };
};

const x = BST([1, 2, 3, 4, 5, 6, 7]);
x.prettyPrint(x.root);
