/**
 * Created by kwsy on 2018/9/6.
 * 查找单链表中的倒数第K个节点（k > 0）
 */
var Node = function(data){
    this.data = data;
    this.next = null;
}

var node1 = new Node(1);
var node2 = new Node(2);
var node3 = new Node(3);
var node4 = new Node(4);
var node5 = new Node(5);


node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;


function reverse_find(head, k){
    // 在这里实现你的代码,返回倒数第k个节点的值
    var fast = head;
    var slow = head;
    var step = k;
    // 先让快游标的先走k步
    while(step > 0 && fast){
        fast = fast.next;
        step -= 1;
    }

    // 当循环结束时,如果step != 0,说明链表的长度不够k
    if(step!=0){
        return null;
    }else{
        // 快的和慢的游标一起走
        while(fast && slow){
            fast = fast.next;
            slow = slow.next;
        }
    }
    return slow.data;
};

console.log(reverse_find(node1, 2));