/**
 * Created by kwsy on 2018/9/3.
 * 定义一个链表
 */


function LinkList(){
    // 定义节点
    var Node = function(data){
        this.data = data;
        this.next = null;
    }

    var length = 0;        // 长度
    var head = null;       // 头节点
    var tail = null;       // 尾节点

    // 添加一个新元素
    this.append = function(data){
        // 创建新节点
        var node = new Node(data);
        // 如果是空链表
        if(head==null){
            head = node;
            tail = head;
        }else{
            tail.next = node;       // 尾节点指向新创建的节点
            tail = node;            // tail指向链表的最后一个节点
        }
        length += 1;                // 长度加1
        return true;
    };

    // 返回链表大小
    this.length = function(){
        return length;
    };

    // 获得指定位置的节点
    var get_node = function(index){
        if(index < 0 || index >= length){
            return null;
        }
        var curr_node = head;
        var node_index = index;
        while(node_index-- > 0){
            curr_node = curr_node.next;
        }
        return curr_node;
    };

    // 在指定位置插入新的元素
    this.insert = function(index, data){
        // index == length,说明是在尾节点的后面新增,直接调用append方法即可
        if(index == length){
            return this.append(data);
        }else if(index > length || index < 0){
            // index范围错误
            return false;
        }else{
            var new_node = new Node(data);
            if(index == 0){
                // 如果在头节点前面插入,新的节点就变成了头节点
                new_node.next= head;
                head = new_node;
            }else{
                // 要插入的位置是index,找到索引为index-1的节点,然后进行连接
                var pre_node = get_node(index-1);
                new_node.next = pre_node.next;
                pre_node.next = new_node;
            }
            length += 1;
            return true;
        }
    };

    // 删除指定位置的节点
    this.remove = function(index){
        // 参数不合法
        if(index < 0 || index >= length){
            return null;
        }else{
            var del_node = null;
            // 删除的是头节点
            if(index == 0){
                // head指向下一个节点
                del_node = head;
                head = head.next;
                // 如果head == null,说明之前链表只有一个节点
                if(!head){
                    tail = null;
                }
            }else{
                // 找到索引为index-1的节点
                var pre_node = get_node(index-1);
                del_node = pre_node.next;
                pre_node.next = pre_node.next.next;
                // 如果删除的是尾节点
                if(del_node.next==null){
                    tail = pre_node;
                }
            }

            length -= 1;
            del_node.next = null;
            return del_node.data;
        }
    };

    // 删除尾节点
    this.remove_tail = function(){
        return this.remove(length-1);
    };

    // 删除头节点
    this.remove_head = function(){
        return this.remove(0);
    };

    // 返回指定位置节点的值
    this.get = function(index){
        var node = get_node(index);
        if(node){
            return node.data;
        }
        return null;
    };



    // 返回链表头节点的值
    this.head = function(){
        return this.get(0);
    }

    // 返回链表尾节点的值
    this.tail = function(){
        return this.get(length-1);
    }

    // 返回指定元素的索引,如果没有,返回-1
    // 有多个相同元素,返回第一个
    this.indexOf = function(data){
        var index = -1;
        var curr_node = head;
        while(curr_node){
            index += 1
            if(curr_node.data == data){
                return index;
            }else{
                curr_node = curr_node.next;
            }
        }
        return -1;
    };

    // 输出链表
    this.print = function(){
        var curr_node = head;
        var str_link = ""
        while(curr_node){

            str_link += curr_node.data.toString() + " ->";
            curr_node = curr_node.next;
        }
        str_link += "null";
        console.log(str_link);
        console.log("长度为"+ length.toString());
    };

    // isEmpty
    this.isEmpty = function(){
        return length == 0;
    };

    // 清空链表
    this.clear = function(){
        head = null;
        tail = null;
        length = 0;
    };

};


exports.LinkList = LinkList;


var link = new LinkList();
link.append(1).append(2);
link.print();
