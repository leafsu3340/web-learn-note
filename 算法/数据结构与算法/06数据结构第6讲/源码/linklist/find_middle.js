/**
 * Created by kwsy on 2018/9/6.
 */

var Node = function(data){
    this.data = data;
    this.next = null;
};

var node1 = new Node(1);
var node2 = new Node(2);
var node3 = new Node(3);
var node4 = new Node(4);
var node5 = new Node(5);


node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;


function find_middle(head){
    // 在这里实现你的代码,返回倒数第k个节点的值
    var fast = head;
    var slow = head;
    // 两个一起走,fast一次走两步,slow一次走一步
    while(fast.next){
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow.data;
};

console.log(find_middle(node1));