/**
 * Created by kwsy on 2018/9/12.
 * 实现一棵AVL树
 */

var AVLNode = function(data){
    this.bf = 0;                // 平衡因子   右子树的高度减左子树的高度
    this.data = data;           // 数据,关键码
    this.leftChild = null;      // 左孩子
    this.rightChild = null;     // 右孩子
    this.parent = null;         // 父节点
};

function AVLTree(){
    var root = null;

    var refresh = function(node){
        if(node==null){
            return 0;
        }
        var left_height = refresh(node.leftChild);
        var right_heigth = refresh(node.rightChild);
        node.bf = right_heigth - left_height;

        if(left_height>right_heigth){
            return left_height+1;
        }else{
            return right_heigth+1;
        }
    };
    var change_bf = function(node){
        if(node.parent == null){
            return null;
        }

        // node是父节点的左孩子
        if(node.parent.leftChild && node.parent.leftChild.data == node.data){
            node.parent.bf -= 1;
            if(node.parent.bf == -2){
                return node.parent;
            }else if(node.parent.bf == 0){
                return null;
            }else{
                return change_bf(node.parent);
            }
        }else{
            // node节点是父节点的右孩子
            node.parent.bf += 1;
            if(node.parent.bf == 2){
                return node.parent;
            }else if(node.parent.bf == 0){
                return null;
            }else{
                return change_bf(node.parent);
            }
        }
    };

    var turn_left = function(node){
        // 对node进行左翻转
        var old_parent = node.parent;        // node 的父节点
        var right_child = node.rightChild;   // node 的右孩子

        node.rightChild = right_child.leftChild;
        if(node.rightChild){
            node.rightChild.parent = node;
        }

        node.parent = right_child;
        right_child.parent = old_parent
        right_child.leftChild = node;
        if(old_parent){
            if(old_parent.leftChild.data == node.data){
                old_parent.leftChild = right_child;
            }else{
                old_parent.rightChild = right_child;
            }
        }else{
            root = right_child;
        }
        refresh(right_child);
    };

    var trun_right = function(node){
        var old_parent = node.parent;        // node 的父节点
        var left_child = node.leftChild;     // node 的左孩子

        node.leftChild = left_child.rightChild;
        if(node.leftChild){
            node.leftChild.parent = node;
        }

        node.parent = left_child;
        left_child.parent = old_parent;
        left_child.rightChild = node;
        if(old_parent){
            if(old_parent.leftChild.data == node.data){
                old_parent.leftChild = left_child;
            }else{
                old_parent.rightChild = left_child;
            }
        }else{
            root = left_child;
        }
    };

    var turn_left_right = function(node){
        var old_parent = node.parent;        // node 的父节点
        var left_child = node.leftChild;     // node 的左孩子
        var left_child_right = left_child.rightChild   // node 的左孩子的右孩子

        left_child.rightChild = left_child_right.leftChild;
        if(left_child.rightChild){
            left_child.rightChild.parent = left_child;
        }

        node.leftChild = left_child_right.rightChild;
        if(node.leftChild){
            node.leftChild.parent = node;
        };

        left_child.parent = left_child_right;
        left_child_right.leftChild = left_child;
        node.parent = left_child_right;
        left_child_right.rightChild = node;

        left_child_right.parent = old_parent;
        if(old_parent){
            if(old_parent.leftChild.data == node.data){
                old_parent.leftChild = left_child_right;
            }else{
                old_parent.rightChild = left_child_right;
            }
        }else{
            root = left_child_right;
        }

    };

    var trun_right_left = function(node){
        var old_parent = node.parent;        // node 的父节点
        var right_child = node.rightChild;   // node 的右孩子
        var right_child_left = right_child.leftChild // node 的右孩子的左孩子

        right_child.leftChild = right_child_left.rightChild;
        if(right_child.leftChild){
            right_child.leftChild.parent = right_child;
        }

        node.rightChild = right_child_left.leftChild;
        if(node.rightChild){
            node.rightChild.parent = node;
        }

        right_child.parent = right_child_left;
        right_child_left.rightChild = right_child;
        node.parent = right_child_left;
        right_child_left.leftChild = node;

        right_child_left.parent = old_parent;
        if(old_parent){
            if(old_parent.leftChild.data == node.data){
                old_parent.leftChild = right_child_left;
            }else{
                old_parent.rightChild = right_child_left;
            }
        }else{
            root = right_child_left;
        }
    };
    var turn_node = function(node){
        var unblance_node = change_bf(node);
        // 如果unblance_node 为null,则不需要翻转
        if(unblance_node != null){
            // 右子树高
            if(unblance_node.bf ==2){
                if(unblance_node.rightChild.bf==1){
                    turn_left(unblance_node);
                    console.log("turn_left");
                }else{
                    trun_right_left(unblance_node);
                    console.log("trun_right_left");
                }
            }else if(unblance_node.bf == -2){
                if(unblance_node.leftChild.bf ==-1){
                    trun_right(unblance_node);
                    console.log("trun_right");
                }else if(unblance_node.leftChild.bf ==1){
                    turn_left_right(unblance_node);
                    console.log("turn_left_right");
                }
            }
            // refresh(root);
        }
    };
    var insert_data = function(node, data){
        var new_node = null;
        if(root == null){
            new_node = new AVLNode(data);
            root = new_node;
            return true;
        }

        if(data < node.data){
            if(node.leftChild){
                // 往左子树里插入
                return insert_data(node.leftChild, data);
            }else{
                // 创建节点并插入
                new_node = new AVLNode(data);
                node.leftChild = new_node;
                new_node.parent = node;
                turn_node(new_node);
                return true;
            }
        }else if(data > node.data){
            if(node.rightChild){
                // 向右子树里插入
                return insert_data(node.rightChild, data);
            }else{
                // 创建节点并插入
                new_node = new AVLNode(data);
                node.rightChild = new_node;
                new_node.parent = node;
                turn_node(new_node);
                return true;
            }

        }else{
            // 如果相等,说明已经存在,不能再插入
            return false;
        }

    };

    this.insert = function(data){
        return insert_data(root, data);
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

    var get_line = function(offset, data){
        var line = "";
        for(var i = 0;i<offset;i++){
            line += "  ";
        }
        return line + data;
    };

    var set_line = function(lines, index, line){
        var old_line = lines[index];
        var sub_line = line.substring(old_line.length)
        lines[index] = old_line + sub_line;
    };
    var super_print = function(node, height, curr_height, offset, direction, lines){
        if(!node){
            return;
        }
        var new_offset = null;
        var width = 3;
        if(curr_height==1){
            new_offset = (height-1)*4*width;
            var line = get_line(new_offset, node.data.toString());
            lines[0] = line;
        }else {
            var line = null;
            var link_length = height - 1;

            if(curr_height%2 == 0){
                link_length = 4;
            }else{
                link_length = 3;
            }
            width = height + 1 - curr_height;
            if(direction==0){
                for(var i = 1;i<=link_length;i++){
                    new_offset = offset - i*width;
                    if(i==link_length){
                        new_offset = offset - link_length*width;
                        line = get_line(new_offset, node.data.toString());
                    }else{
                        line = get_line(new_offset, ".");
                    }
                    set_line(lines, (curr_height-2)*4+i,line);
                }

            }else{
                for(var i = 1;i<=link_length;i++){
                    new_offset = offset + i*width;
                    if(i==link_length){
                        new_offset = offset + link_length*width;
                        line = get_line(new_offset, node.data.toString());
                    }else{
                        line = get_line(new_offset, ".");
                    }
                    set_line(lines, (curr_height-2)*4+i,line);
                }
            }
        }
        super_print(node.leftChild, height, curr_height+1, new_offset, 0, lines);
        super_print(node.rightChild, height, curr_height+1, new_offset, 1, lines);

    };
    this.print = function(){
        var height = this.height();
        var lines = new Array((height-1)*4 +1);

        for(var i =0;i<lines.length; i++){
            lines[i] = "";
        }

        super_print(root, height, 1,null, null, lines)
        for(var i=0;i<lines.length; i++){
            console.log(lines[i]);
        }
    };


    var link_parent = function(parent, node, next_node){
        // 连接父节点和子节点
        var change = 1;
        if(parent==null){
            root = next_node;
            root.parent = null;
        }else{
            if(parent.leftChild && parent.leftChild.data == node.data){
                parent.leftChild = next_node;
            }else{
                parent.rightChild = next_node;
                change = -1;
            }
        }

        var unblance_node = change_bf_after_remove(parent, change);
        reblance_node(unblance_node);
    };

    var reblance_node = function(node){
        if(node == null){
            return;
        };

        var unblance_node = node;
        if(node.bf == 2){
            var old_parent = node.parent;
            var right_child = node.rightChild;
            var right_child_bf = right_child.bf;
            if(right_child_bf == 0 || right_child_bf == 1){
                node.rightChild = right_child.leftChild;
                if(node.rightChild){
                    node.rightChild.parent = node;
                }

                node.parent = right_child;
                right_child.leftChild = node;
                right_child.parent = old_parent;
                if(old_parent){
                    if(old_parent.leftChild && old_parent.leftChild.data == node.data){
                        old_parent.leftChild = right_child;
                    }else{
                        old_parent.rightChild = right_child;
                    }
                }else{
                    root = right_child;
                }

                refresh(right_child);
                if(right_child_bf == 0){
                    return;
                }else{
                    unblance_node = change_bf_after_remove(right_child.parent, -1);
                    reblance_node(unblance_node);
                }
            }else{
                // right_child_bf = -1
                var right_child_left = right_child.leftChild;

                node.rightChild = right_child_left.leftChild;
                if(node.rightChild){
                    node.rightChild.parent = node;
                }

                right_child.leftChild = right_child_left.rightChild
                if(right_child.leftChild){
                    right_child.leftChild.parent = right_child;
                }

                node.parent = right_child_left;
                right_child_left.leftChild = node;
                right_child.parent = right_child_left;
                right_child_left.rightChild = right_child;

                right_child_left.parent = old_parent;
                if(old_parent){
                    if(old_parent.leftChild && old_parent.leftChild.data == node.data){
                        old_parent.leftChild = right_child_left;
                    }else{
                        old_parent.rightChild = right_child_left;
                    }
                }else{
                    root = right_child_left;
                }
                refresh(right_child_left);
                unblance_node = change_bf_after_remove(right_child_left.parent, -1);
                reblance_node(unblance_node);
            }
        }else{
            var old_parent = node.parent;
            var left_child = node.leftChild;
            var left_child_bf = left_child.bf;
            if(left_child_bf == 0 || left_child_bf==-1){
                node.leftChild = left_child.rightChild;
                if(node.leftChild){
                    node.leftChild.parent = node;
                }

                node.parent = left_child;
                left_child.rightChild = node;
                left_child.parent = old_parent;
                if(old_parent){
                    if(old_parent.leftChild && old_parent.leftChild.data == node.data){
                        old_parent.leftChild = left_child;
                    }else{
                        old_parent.rightChild = left_child;
                    }
                }else{
                    root = left_child;
                }

                refresh(left_child);
                if(left_child_bf==0){
                    return;
                }else{
                    unblance_node = change_bf_after_remove(left_child.parent, 1);
                    reblance_node(unblance_node);
                }
            }else{
                var left_child_right = left_child.rightChild;
                node.leftChild = left_child_right.rightChild;
                if(node.leftChild){
                    node.leftChild.parent = node;
                }

                left_child.rightChild = left_child_right.leftChild;
                if(left_child.rightChild){
                    left_child.rightChild.parent = left_child;
                }
                node.parent = left_child_right;
                left_child_right.rightChild = node;
                left_child.parent = left_child_right;
                left_child_right.leftChild = left_child;
                left_child_right.parent = old_parent;
                if(old_parent){
                    if(old_parent.leftChild && old_parent.leftChild.data == node.data){
                        old_parent.leftChild = left_child_right;
                    }else{
                        old_parent.rightChild = left_child_right;
                    }
                }else{
                    root = left_child_right;
                }
                refresh(left_child_right);
                unblance_node = change_bf_after_remove(left_child_right.parent, 1);
                reblance_node(unblance_node);
            }
        }
    };
    var change_bf_after_remove = function(node, change){
        if(node == null){
            return null;
        }
        // node的平衡因子 只可能有 3个值 -1 0 1
        node.bf += change;
        // 变化以后, node的平衡因子 可以为-2 -1 0 1 2
        if(node.bf == 1 || node.bf == -1){
            return null;
        }else if(node.bf == 0){
            return change_bf_after_remove(node.parent, change);
        }else if(node.bf == 2 || node.bf == -2){
            return node;
        }
    };

    var remove_data = function(node, data){
        if(node==null){
            return false;
        }

        if(data < node.data){
            // 去左子树里删除
            return remove_data(node.leftChild, data);
        }else if(data > node.data){
            // 去又子树里删除
            return remove_data(node.rightChild, data);
        }else{
            if(node.leftChild && node.rightChild){
                // 左右两个子树都存在,那么,找到中序下的第一个节点,这个节点在右子树里最小
                var tmp = node.rightChild;
                while(tmp.leftChild){
                    tmp = tmp.leftChild;
                }
                // 被删除点的值等于中序下第一个节点的值
                node.data = tmp.data;
                // 去右子树里删除中序下的第一个节点
                return remove_data(node.rightChild, tmp.data);

            }else{
                var parent = node.parent;   // 找到父节点
                if(!node.leftChild){
                    // 没有左孩子,有右孩子
                    link_parent(parent, node, node.rightChild);
                }else{
                    link_parent(parent, node, node.leftChild);
                }
                return true
            }
        }
    };

    this.remove = function(data){
        return remove_data(root, data);
    };
};


function test_turn_left(){
    var avl_tree = new AVLTree();
    avl_tree.insert(1);
    avl_tree.insert(5);
    avl_tree.print();
    avl_tree.insert(8);    // 此处会发生 单左翻转
    avl_tree.print();

    avl_tree.insert(9);
    avl_tree.print();

};


function test_turn_right(){
    var avl_tree = new AVLTree();
    avl_tree.insert(10);
    avl_tree.insert(9);
    avl_tree.print();
    avl_tree.insert(8);    // 此处发生单右翻转
    avl_tree.print();

    avl_tree.insert(7);
    avl_tree.print();
    avl_tree.insert(6);    // 此处发生单右翻转
    avl_tree.print();
};

function test_runt_left_right(){
    var avl_tree = new AVLTree();
    avl_tree.insert(30);
    avl_tree.insert(25);
    avl_tree.insert(18);
    avl_tree.insert(10);
    avl_tree.insert(3);
    avl_tree.insert(27);
    avl_tree.insert(15);
    avl_tree.insert(19);
    avl_tree.insert(7);
    avl_tree.print();
    console.log("\n\n");
    avl_tree.insert(13);   // 会发生先左后右翻转  节点18被拆
    avl_tree.print();
    console.log("\n\n");

    avl_tree.insert(2);
    avl_tree.insert(1);
    avl_tree.insert(8);
    avl_tree.insert(6);
    avl_tree.print();
    console.log("\n\n");
    avl_tree.insert(5);   // 会发生先左后右翻转, 节点7 会被拆散
    avl_tree.print();
}

function test_turn_right_left(){
    var avl_tree = new AVLTree();
    avl_tree.insert(50);
    avl_tree.insert(25);
    avl_tree.insert(18);
    avl_tree.insert(10);
    avl_tree.insert(9);
    avl_tree.insert(45);
    avl_tree.insert(70);
    avl_tree.insert(40);
    avl_tree.insert(47);
    avl_tree.insert(90);
    avl_tree.print();
    console.log("\n\n");
    avl_tree.insert(46);   //此处发生先右后翻转, 节点45会被拆散
    avl_tree.print();
    console.log("\n\n");
    avl_tree.insert(100);
    avl_tree.insert(60);
    avl_tree.insert(55);
    avl_tree.print();
    avl_tree.insert(65);   //此处发生先左厚右翻转, 节点70会被拆散
    avl_tree.print();
    console.log("\n\n");
    avl_tree.insert(53);   // 此处发生先右后左翻转, 节点60被拆散
    avl_tree.print();
}


function test_remove_1(){
    // 测试删除节点后, 无需调整的情况
    var avl_tree = new AVLTree();
    avl_tree.insert(6);
    avl_tree.insert(4);
    avl_tree.insert(8);
    avl_tree.insert(3);
    avl_tree.insert(9);
    avl_tree.print();

    avl_tree.remove(3);
    avl_tree.print();

    avl_tree.remove(4);

};


function test_remove_2(){
    // 测试删除后,父节点平衡因子为2,父节点右孩子平衡因子为0的情况, 根节点被替换
    var avl_tree = new AVLTree();
    avl_tree.insert(20);
    avl_tree.insert(15);
    avl_tree.insert(40);
    avl_tree.insert(35);
    avl_tree.insert(45);
    avl_tree.print();

    avl_tree.remove(15);     // 删除15后,节点20的平衡因子变2  40 的平衡因子是0  40成为树新的根节点
    avl_tree.print();
}

function test_remove_3(){
    // 测试删除后,父节点平衡因子为2,父节点右孩子平衡因子为0, 根节点不被替换的情况
    var avl_tree = new AVLTree();
    avl_tree.insert(10);
    avl_tree.insert(20);
    avl_tree.insert(8);
    avl_tree.insert(15);
    avl_tree.insert(7);
    avl_tree.insert(40);
    avl_tree.insert(35);
    avl_tree.insert(45);
    avl_tree.print();

    avl_tree.remove(15);    //15被删除, 40 顶替20 的位置
    avl_tree.print();
}


function test_remove_3(){
    // 测试删除,父节点平衡因子为2 ,父节点的右孩子平衡因子为1, 根节点被替换
    var avl_tree = new AVLTree();
    avl_tree.insert(20);
    avl_tree.insert(15);
    avl_tree.insert(40);
    avl_tree.insert(45);
    avl_tree.print();

    avl_tree.remove(15);
    avl_tree.print();
}

function test_remove_4(){
    // 测试删除后,父节点平衡因子为2 ,父节点的右孩子平衡因子为1, 根节点不被替换的情况
    var avl_tree = new AVLTree();
    avl_tree.insert(10);
    avl_tree.insert(20);
    avl_tree.insert(8);
    avl_tree.insert(15);
    avl_tree.insert(7);
    avl_tree.insert(40);
    avl_tree.insert(45);
    avl_tree.print();

    avl_tree.remove(15);
    avl_tree.print();

}

// 还没有实现
function test_remove_5(){
    // 测试删除后,父节点平衡因子为2 ,父节点的右孩子平衡因子为1, 调整后,树依然不平衡,需要继续调整的情况
    var avl_tree = new AVLTree();
    avl_tree.insert(14);
    avl_tree.insert(20);
    avl_tree.insert(9);
    avl_tree.insert(10);

    avl_tree.insert(15);
    avl_tree.insert(5);
    avl_tree.insert(11);
    avl_tree.insert(6);
    avl_tree.insert(4);
    avl_tree.insert(40);
    avl_tree.insert(45);
    avl_tree.insert(7);
    avl_tree.print();

    avl_tree.remove(15);
    avl_tree.print();
};

function test_remove_6(){
    // 测试删除后,父节点bf = 2 ,父节点的右孩子bf = -1, 根节点被替换
    var avl_tree = new AVLTree();
    avl_tree.insert(20);
    avl_tree.insert(15);
    avl_tree.insert(40);
    avl_tree.insert(35);
    avl_tree.print();

    avl_tree.remove(15);
    avl_tree.print();
};

function test_remove_7(){
    // 测试删除后,父节点bf = 2 ,父节点的右孩子bf = -1, 根节点不被替换
    var avl_tree = new AVLTree();
    avl_tree.insert(10);
    avl_tree.insert(8);
    avl_tree.insert(20);
    avl_tree.insert(15);
    avl_tree.insert(7);
    avl_tree.insert(40);
    avl_tree.insert(35);
    avl_tree.print();

    avl_tree.remove(15);
    avl_tree.print();
};


function test_remove_8(){
    // 测试删除后,父节点bf = 2 ,父节点的右孩子bf = -1, 调整后,依然不平衡,需要继续向上寻找调整节点
    var avl_tree = new AVLTree();
    avl_tree.insert(14);
    avl_tree.insert(20);
    avl_tree.insert(9);
    avl_tree.insert(10);

    avl_tree.insert(15);
    avl_tree.insert(5);
    avl_tree.insert(11);
    avl_tree.insert(6);
    avl_tree.insert(4);
    avl_tree.insert(40);
    avl_tree.insert(35);
    avl_tree.insert(7);
    avl_tree.print();

    avl_tree.remove(15);   // 删除15后,35顶替20的位置,14 的bf为-2 , 9的bf是 -1 需要继续调整
    avl_tree.print();
};


function test_remove_9(){
    // 测试删除后,父节点bf = 2 ,父节点的右孩子bf = -1, 调整后,依然不平衡,需要继续向上寻找调整节点
    var avl_tree = new AVLTree();
    avl_tree.insert(28);
    avl_tree.insert(30);
    avl_tree.insert(19);
    avl_tree.insert(23);

    avl_tree.insert(29);
    avl_tree.insert(15);
    avl_tree.insert(26);
    avl_tree.insert(16);
    avl_tree.insert(14);
    avl_tree.insert(50);
    avl_tree.insert(45);
    avl_tree.insert(22);
    avl_tree.insert(25);
    avl_tree.print();

    avl_tree.remove(29);   // 删除29,45顶替30的位置,28的bf是-2 ,19的bf是1,双旋转平衡
    avl_tree.print();
}
test_remove_9();