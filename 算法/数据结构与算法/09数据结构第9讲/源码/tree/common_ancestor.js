/**
 * Created by kwsy on 2018/9/11.
 */

const BinaryTree = require('./binarytree');

var bt = new BinaryTree.BinaryTree();
bt.init_tree("A(B(D,E(G,)),C(,F))#");
var root_node = bt.get_root();

var node1 = bt.find("D");
var node2 = bt.find("G");

// 寻找最近公共祖先
var lowest_common_ancestor = function(root_node, node1, node2){
    if(!root_node || root_node==node1 || root_node==node2){
        return root_node;
    }

    var left = lowest_common_ancestor(root_node.leftChild, node1, node2);
    var right = lowest_common_ancestor(root_node.rightChild, node1, node2);

    if(left && right){
        return root_node;
    }
    if(left){
        return left;
    }
    return right;
};

var ancestor = lowest_common_ancestor(root_node, node1, node2);
console.log(ancestor.data);