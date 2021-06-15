/**
 * Created by kwsy on 2018/9/11.
 * 非递归实现后续遍历
 */

const BinaryTree = require('./binarytree')
const Stack = require('./stack');

var bt = new BinaryTree.BinaryTree();
bt.init_tree("A(B(D,E(G,)),C(,F))#");
var root_node = bt.get_root();


var Tag = function(node, state){
    this.node = node;
    this.state = state;    // 0表示左边已经遍历结束,1表示右边已经遍历结束
};

function post_order(node){
    var stack = new Stack.Stack();
    var curr_node = node;
    while(true){
        while(curr_node){
            var tag = new Tag(curr_node, 0);
            stack.push(tag);
            curr_node = curr_node.leftChild;
        }

        // 栈顶元素没有左子树
        var pop_item = stack.pop();
        // 如果有右子树,且右子树还没有遍历过, 要先进入到右子树中遍历
        if(pop_item.node.rightChild && pop_item.state==0){
            // 进入右子树
            pop_item.state = 1;
            stack.push(pop_item);
            curr_node = pop_item.node.rightChild;
        }else{
            // 无右子树,或者右子树已经进去过
            console.log(pop_item.node.data);
        }

        if(!curr_node && stack.isEmpty()){
            break;
        }
    }
};
bt.post_order(root_node);
post_order(root_node);