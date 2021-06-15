/**
 * Created by kwsy on 2018/9/8.
 */
const Stack = require('./stack');
const Queue = require('./queue');

var BinTreeNode = function(data){
    this.data = data;
    this.leftChild = null;     // 左孩子
    this.rightChild = null;    // 右孩子
    this.parentNode = null;    // 父节点
};


function BinaryTree(){
    var root = null;   //根节点


    // 采用广义表表示的建立二叉树方法
    this.init_tree = function(string){
        var stack = new Stack.Stack();
        var k = 0;
        var new_node = null;
        for(var i =0; i < string.length;i++){
            var item = string[i];
            if(item == "#"){
                break;
            }
            if(item=="("){
                stack.push(new_node);
                k = 1;
            }else if(item==")"){
                stack.pop();
            }else if(item==","){
                k = 2;
            }else{
                new_node = new BinTreeNode(item);
                if(root==null){
                    root = new_node;
                }else if(k==1){
                    // 左子树
                    var top_item = stack.top();
                    top_item.leftChild = new_node;
                    new_node.parentNode = top_item;
                }else{
                    // 右子树
                    var top_item = stack.top();
                    top_item.rightChild = new_node;
                    new_node.parentNode = top_item;
                }
            }
        }
    };

    this.get_root = function(){
        return root;
    };

    // 中序遍历
    this.in_order = function(node){
        if(node==null){
            return;
        }
        this.in_order(node.leftChild);
        console.log(node.data);
        this.in_order(node.rightChild);
    };


    // 前序遍历
    this.pre_order = function(node){
        if(node==null){
            return;
        }
        console.log(node.data);
        this.pre_order(node.leftChild);
        this.pre_order(node.rightChild);
    };

    // 后序遍历
    this.post_order = function(node){
        if(node==null){
            return;
        }
        this.post_order(node.leftChild);
        this.post_order(node.rightChild);
        console.log(node.data);
    };


    var tree_node_count = function(node){
        // 左子树的节点数量加上右子树的节点数量 再加上1
        if(!node){
            return 0;
        }
        var left_node_count = tree_node_count(node.leftChild);
        var right_node_count = tree_node_count(node.rightChild);
        return left_node_count + right_node_count + 1;
    };
    // 返回节点数量
    this.size = function(){
        return tree_node_count(root);
    };

    var tree_height = function(node){
        // 左子树的高度和右子树的高度取最大值,加上当前的高度
        if(!node){
            return 0;
        }

        var left_child_height = tree_height(node.leftChild);
        var right_child_height = tree_height(node.rightChild);
        if(left_child_height > right_child_height){
            return left_child_height + 1;
        }else{
            return right_child_height + 1;
        }

    };
    // 返回高度
    this.height = function(){
        return tree_height(root);
    };

    var find_node = function(node, data){
        if(!node){
            return null;
        }
        if(node.data == data){
            return node;
        }

        left_res = find_node(node.leftChild, data);
        if(left_res){
            return left_res;
        }

        return find_node(node.rightChild, data);
    };
    // 查找data
    this.find = function(data){
        return find_node(root, data);
    };


};

exports.BinaryTree = BinaryTree;


