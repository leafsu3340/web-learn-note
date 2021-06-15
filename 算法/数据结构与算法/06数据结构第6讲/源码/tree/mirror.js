/**
 * Created by kwsy on 2018/9/9.
 */

const BinaryTree = require('./binarytree')

var bt = new BinaryTree.BinaryTree();
bt.init_tree("A(B(D,E(G,)),C(,F))#");
var root_node = bt.get_root();


var mirror_1 = function(node){
    if(!node){
        return;
    }
    // 用tmp保存右孩子
    var tmp = node.leftChild;
    // 左孩子等于右孩子
    node.leftChild = node.rightChild;
    // 右孩子等于左孩子
    node.rightChild = tmp;
    // 继续翻转
    mirror_1(node.leftChild);
    mirror_1(node.rightChild);
}

var mirror_2 = function(node){
    if(!node){
        return null;
    }
    // 翻转左子树
    var left = mirror_2(node.leftChild);
    // 翻转右子树
    var right = mirror_2(node.rightChild);

    // 左右孩子互换
    node.rightChild = left;
    node.leftChild = right;
    // 返回当前节点
    return node;
};

mirror_2(root_node);
bt.in_order(root_node);
