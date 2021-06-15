/**
 * Created by kwsy on 2018/8/25.
 * 用队列来计算斐波那契
 */

Queue = require('./myqueue')

function fibonacci(n){
    queue = new Queue.Queue();
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