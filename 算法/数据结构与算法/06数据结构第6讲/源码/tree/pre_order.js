/**
 * Created by kwsy on 2018/9/9.
 * 非递归实现前序遍历
 */

const BinaryTree = require('./binarytree')
const Stack = require('./stack');

var bt = new BinaryTree.BinaryTree();
bt.init_tree("A(B(D,E(G,)),C(,F))#");
var root_node = bt.get_root();


function pre_order(node){
    var stack = new Stack.Stack();
    var curr_node = node;

    while(curr_node){
        console.log(curr_node.data);
        if(curr_node.rightChild){
            stack.push(curr_node.rightChild);
        }

        if(curr_node.leftChild){
            curr_node = curr_node.leftChild;
        }else{
            curr_node = stack.pop();
        }
    }
};


pre_order(root_node);