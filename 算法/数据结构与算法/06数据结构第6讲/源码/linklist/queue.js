/**
 * Created by kwsy on 2018/9/3.
 * 用链表实现队列
 */

LinkList = require("./mylinklist");

function Queue(){
    var linklist = new LinkList.LinkList();

    // 入队列
    this.enqueue = function(item){
        linklist.append(item);
    };

    // 出队列
    this.dequeue = function(){
        return linklist.remove_head();
    };

    // 返回队首
    this.head = function(){
        return linklist.head();
    };

    // 返回队尾
    this.tail = function(){
        return linklist.tail();
    };

    // size
    this.size = function(){
        return linklist.length();
    };

    //clear
    this.clear = function(){
        linklist.clear();
    };

    // isEmpty
    this.isEmpty = function(){
        return linklist.isEmpty();
    };
};


function fibonacci(n){
    queue = new Queue();
    var index = 0;
    // 先放入斐波那契序列的前两个数值
    queue.enqueue(1);
    queue.enqueue(1);
    while(index < n-2){
        // 出队列一个元素
        var del_item = queue.dequeue();
        // 取队列头部元素
        var head_item = queue.head();
        var next_item = del_item + head_item;
        // 将计算结果放入队列
        queue.enqueue(next_item);
        index += 1;
    }

    queue.dequeue();
    return queue.head();
};


console.log(fibonacci(8));

