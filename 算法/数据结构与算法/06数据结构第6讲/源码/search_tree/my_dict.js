/**
 * Created by kwsy on 2018/9/15.
 */

var Term = function(key, value){
    this.key = key;
    this.value = value;
}

var TreeNode = function(data){
    this.data = data.key;
    this.value = data.value;
    this.leftChild = null;
    this.rightChild = null;
    this.parent = null;
};

function BinarySearchTree(){
    var root = null;

    var insert_data = function(node, data){
        if(root == null){
            root = new TreeNode(data);
            return true;
        }

        if(data < node.data){
            if(node.leftChild){
                // 往左子树里插入
                return insert_data(node.leftChild, data);
            }else{
                // 创建节点并插入
                var new_node = new TreeNode(data);
                node.leftChild = new_node;
                new_node.parent = node;
                return true;
            }
        }else if(data > node.data){
            if(node.rightChild){
                // 向右子树里插入
                return insert_data(node.rightChild, data);
            }else{
                // 创建节点并插入
                var new_node = new TreeNode(data);
                node.rightChild = new_node;
                new_node.parent = node;
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

    var search_data = function(node, data){
        if(node == null){
            return null;
        }

        if(data == node.data){
            return node;
        }else if(data < node.data){
            return search_data(node.leftChild, data);
        }else{
            return search_data(node.rightChild, data);
        }
    };

    this.search = function(data){
        return search_data(root, data);
    };

    var link_parent = function(parent, node, next_node){
        // 连接父节点和子节点
        if(parent==null){
            root = next_node;
            root.parent = null;
        }else{
            if(parent.leftChild && parent.leftChild.data == node.data){
                parent.leftChild = next_node;
            }else{
                parent.rightChild = next_node;
            }
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

};

function MyDict(){
    var bst = new BinarySearchTree();
    this.set = function(key, value){
        var term = new Term(key, value);
        bst.insert(term);
    };

    this.get = function(key){
        var data = bst.search(key);
        if(data){
            return data.value;
        }
        return null;
    }

    this.hasKey = function(key){
        if(bst.search(key)){
            return true;
        }
        return false;
    }
};

var md = new MyDict();
md.set('name', 'javascript');
md.set('age', 20);

console.log(md.hasKey('class'));
console.log(md.hasKey('name'));
console.log(md.get("name"));
console.log(md.get("age"));