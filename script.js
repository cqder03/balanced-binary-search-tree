// Imported funcions as per need //
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

function duplicateDelition(array) {
  // Works only on roted arrays, made to work in combination with mergeSort
  const newArr = [];

  let left = 0;
  let right = 1;

  newArr.push(array[left]);
  while (right < array.length) {
    if (array[left] !== array[right]) {
      newArr.push(array[right]);
    }
    left++;
    right++;
  }

  return newArr;
}

function mergeSort(array) {
  if (array.length < 2) {
    return array;
  }

  const mid = Math.floor(array.length / 2);
  let left = mergeSort(array.slice(0, mid));
  let right = mergeSort(array.slice(mid));
  let merge = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      merge.push(left[i]);
      i++;
    } else {
      merge.push(right[j]);
      j++;
    }
  }

  for (i; i < left.length; i++) {
    merge.push(left[i]);
  }

  for (j; j < right.length; j++) {
    merge.push(right[j]);
  }

  return merge;
}

// Imported funcions as per need //

// Tree building classes //
class Node {
  constructor(value) {
    this.data = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.cleanArray = duplicateDelition(mergeSort(array));
    this.root = this.buildTree(this.cleanArray, 0, this.cleanArray.length - 1);
  }

  buildTree(array, start, end) {
    if (start > end) return null;

    const mid = parseInt((start + end) / 2);
    const node = new Node(array[mid]);

    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }

  insert(root, value) {
    if (root === null) {
      root = new Node(value);
      return root;
    }

    if (value < root.data) {
      root.left = this.insert(root.left, value);
    } else if (value > root.data) {
      root.right = this.insert(root.right, value);
    }

    return root;
  }

  delete(root, value) {
    if (root === null) {
      return root;
    }

    if (root.data > value) {
      root.left = this.delete(root.left, value);
      return root;
    } else if (root.data < value) {
      root.right = this.delete(root.right, value);
      return root;
    }

    if (root.left === null) {
      let temp = root.right;
      root.right = null;
      root = temp;
      return temp;
    } else if (root.right === null) {
      let temp = root.left;
      root.left = null;
      root = temp;
      return temp;
    } else {
      let parent = root;
      let child = root.right;

      while (child.left !== null) {
        parent = child;
        child = parent.left;
      }

      if (parent !== root) {
        parent.left = child.right;
      } else {
        parent.right = child.right;
      }

      root.data = child.data;
      child.data = null;

      return root;
    }
  }

  find(root, value) {
    if (root === null || root.data === value) return root;

    if (root.data > value) {
      return this.find(root.left, value);
    } else if (root.data < value) {
      return this.find(root.right, value);
    }
  }

  levelOrder(root, callback) {
    if (root === null) return;

    let queue = [];
    let levelOrderArr = [];
    queue.push(root);

    while (queue[0]) {
      let current = queue[0];

      if (callback) callback(current);

      levelOrderArr.push(current.data);
      queue.shift();

      if (current.left !== null) {
        queue.push(current.left);
      }

      if (current.right !== null) {
        queue.push(current.right);
      }
    }

    if (!callback) return levelOrderArr;
  }

  preOrder(root, arr = [], callback) {
    if (root === null) return;

    if (callback) {
      callback(root);
    }

    arr.push(root.data);

    if (root.left !== null) {
      this.preOrder(root.left, arr, callback);
    }

    if (root.right !== null) {
      this.preOrder(root.right, arr, callback);
    }

    if (!callback) {
      return arr;
    }
  }

  inOrder(root, arr = [], callback) {
    if (root === null) return;

    if (callback) {
      callback(root);
    }

    if (root.left !== null) {
      this.inOrder(root.left, arr, callback);
    }

    arr.push(root.data);

    if (root.right !== null) {
      this.inOrder(root.right, arr, callback);
    }

    if (!callback) {
      return arr;
    }
  }

  postOrder(root, arr = [], callback) {
    if (root === null) return;

    if (callback) {
      callback(root);
    }

    if (root.left !== null) {
      this.postOrder(root.left, arr, callback);
    }

    if (root.right !== null) {
      this.postOrder(root.right, arr, callback);
    }

    arr.push(root.data);

    if (!callback) {
      return arr;
    }
  }

  height(node) {
    if (node === null) return 0;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    let root = this.root;
    let depth = 0;

    while (root.data !== node.data) {
      if (root.data > node.data) {
        depth++;
        root = root.left;
      } else if (root.data < node.data) {
        depth++;
        root = root.right;
      }
    }

    return depth;
  }

  isBalanced(node) {
    if (node === null) return true;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    const heightDiffernece = Math.abs(leftHeight - rightHeight);
    
    if (heightDiffernece > 1) {
      return false;
    }

    const leftSubTree = this.isBalanced(node.left);
    const rightSubTree = this.isBalanced(node.right);

    if (heightDiffernece <= 1 && leftSubTree && rightSubTree) {
      return true;
    }

    return false;
  }

  rebalance() {
    const rebalanced = this.inOrder(this.root);
    this.root = this.buildTree(rebalanced, 0, rebalanced.length - 1);
  }
}

// Tree building classes //

// Tie it all together part //

function driverScript() {
  const treeArray = [];
  const numberOfElements = 30;

  for (let i = 0; i < numberOfElements; i++) {
    let num = Math.floor(Math.random() * (100 - 1) + 1);
    treeArray.push(num);
  } 

  const balanceSubTree = new Tree(treeArray);

  console.log('Printing created tree..');
  console.log(`Element ${treeArray[5]} height ${balanceSubTree.height(balanceSubTree.find(balanceSubTree.root, treeArray[5]))}`);
  prettyPrint(balanceSubTree.root);
  console.log(`Checking if tree is balanced: (${balanceSubTree.isBalanced(balanceSubTree.root)})`);
  console.log(`Printing elements in level order: ${balanceSubTree.levelOrder(balanceSubTree.root)}`);
  console.log(`Printing elements in preorder: ${balanceSubTree.preOrder(balanceSubTree.root)}`);
  console.log(`Printing elements in order: ${balanceSubTree.inOrder(balanceSubTree.root)}`);
  console.log(`Printing elements in postorder: ${balanceSubTree.postOrder(balanceSubTree.root)}`);

  unbalanceArray = [];

  for (let i = 0; i < 6; i++) {
    let num = Math.floor(Math.random() * (200 - 100) + 100);
    unbalanceArray.push(num);
  }

  console.log('Unbalancing the tree by adding 6 random numbers over 100.');

  unbalanceArray.forEach(number => {
    balanceSubTree.insert(balanceSubTree.root, number);
  });

  console.log(`Checking if tree is balanced: (${balanceSubTree.isBalanced(balanceSubTree.root)})`);
  console.log('Pringing unbalanced tree...');

  prettyPrint(balanceSubTree.root);

  console.log('Balancing tree...');
  balanceSubTree.rebalance();
  console.log(`Checking if tree is balanced: (${balanceSubTree.isBalanced(balanceSubTree.root)})`);

  console.log('Prining balanced tree...');

  prettyPrint(balanceSubTree.root);

  console.log(`Printing elements in level order: ${balanceSubTree.levelOrder(balanceSubTree.root)}`);
  console.log(`Printing elements in preorder: ${balanceSubTree.preOrder(balanceSubTree.root)}`);
  console.log(`Printing elements in order: ${balanceSubTree.inOrder(balanceSubTree.root)}`);
  console.log(`Printing elements in postorder: ${balanceSubTree.postOrder(balanceSubTree.root)}`);
}

// Tie it all together part //