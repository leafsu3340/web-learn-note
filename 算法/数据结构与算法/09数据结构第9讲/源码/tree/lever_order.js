/**
 * Created by kwsy on 2018/9/11.
 */

const BinaryTree = require('./binarytree');
const Queue = require('./queue');


var bt = new BinaryTree.BinaryTree();
bt.init_tree("A(B(D,E(G,)),C(,F))#");
var root_node = bt.get_root();

// 层次遍历
var level_order = function(node){
    var queue = new Queue.Queue();
    // 把当前节点放入到队列
    queue.enqueue(node);
    queue.enqueue(0);
    var str_link = "";
    while(!queue.isEmpty()){

        del_item = queue.dequeue();
        if(del_item == 0){
            console.log(str_link);
            str_link = "";
            if(queue.isEmpty()){
                break;
            }else{
                queue.enqueue(0);
            }
            continue;
        }

        str_link += del_item.data + "  ";

        // 把左右子节点放入到队列
        if(del_item.leftChild){
            queue.enqueue(del_item.leftChild);
        }
        if(del_item.rightChild){
            queue.enqueue(del_item.rightChild);
        }
    }
};

level_order(root_node);