/**
 * Created by kwsy on 2018/9/15.
 */

function LinkList(){
    // 定义节点
    var Node = function(key, value){
        this.key = key;
        this.value = value;
        this.next = null;
    };

    var length = 0;        // 长度
    var head = null;       // 头节点
    var tail = null;       // 尾节点

    // 添加一个新元素
    this.append = function(key, value){
        if(this.search(key) != null){
            return false;
        }
        // 创建新节点
        var node = new Node(key, value);
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
            return del_node;
        }
    };

    // 返回指定位置节点的值
    this.get = function(index){
        var node = get_node(index);
        if(node){
            return node;
        }
        return null;
    };

    this.search = function(key){
        var index = -1;
        var curr_node = head;
        while(curr_node){
            index += 1;
            if(curr_node.key === key){
                return curr_node;
            }else{
                curr_node = curr_node.next;
            }
        }
        return null;
    };

    this.remove_key = function(key){
        var index = this.indexOf(key);
        if(index >=0){
            this.remove(index);
            return true;
        }
        return false;
    };

    this.indexOf = function(key){
        var index = -1;
        var curr_node = head;
        while(curr_node){
            index += 1
            if(curr_node.key === key){
                return index;
            }else{
                curr_node = curr_node.next;
            }
        }
        return -1;
    };

    // isEmpty
    this.isEmpty = function(){
        return length == 0;
    };

    // 返回链表大小
    this.length = function(){
        return length;
    };

    this.get_head = function(){
        return head;
    };

};


exports.LinkList = LinkList;