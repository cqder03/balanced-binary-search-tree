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
}

function duplicateDelition(array) { // Works only on roted arrays, made to work in combination with mergeSort
    const newArr = [];
    
    let left = 0;
    let right = 1;

    newArr.push(array[left]);
    while (right < array.length) {
        if (array[left] !== array[right]) {
            newArr.push(array[right]);
        }
        left++;
        right++
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

let testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let testArr2 = [1, 2, 3, 4, 5, 6, 7];

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

    find(root ,value) {
        if (root.data === value || root.data === null) return root;

        if (root.data > value) {
            this.find(root.left, value);
        } else if (root.data < value) {
            this.find(root.right, value);
        }
    }

}
