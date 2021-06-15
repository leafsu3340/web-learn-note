/**
 * Created by kwsy on 2018/9/3.
 * 用两个队列实现一个栈,检验的是对栈与队列的理解
 */

Queue = require('./myqueue')


function QueueStack(){
    var queue_1 = new Queue.Queue();
    var queue_2 = new Queue.Queue();
    var data_queue = null;      // 放数据的队列
    var empty_queue = null;     // 空队列,备份使用

    // 确认哪个队列放数据,哪个队列做备份空队列
    var init_queue = function(){
        // 都为空,默认返回queue_1
        if(queue_1.isEmpty() && queue_2.isEmpty()){
            data_queue = queue_1;
            empty_queue = queue_2;
        }else if(queue_1.isEmpty()){
            data_queue = queue_2;
            empty_queue = queue_1;
        }else{
            data_queue = queue_1;
            empty_queue = queue_2;
        }
    };


    // push方法
    this.push = function (item) {
        init_queue();
        data_queue.enqueue(item);
    };

    // top方法
    this.top = function(){
        init_queue();
        return data_queue.tail();
    }

    /**
     * pop方法要弹出栈顶元素,这个栈顶元素,其实就是queue的队尾元素
     * 但是队尾元素是不能删除的,我们可以把data_queue里的元素(除了队尾元素)都移除放入到empty_queue中
     * 最后移除data_queue的队尾元素并返回
     * data_queue 和 empty_queue 交换了身份
     */
    this.pop = function(){
        init_queue();
        while(data_queue.size()>1){
            empty_queue.enqueue(data_queue.dequeue());
        }
        return data_queue.dequeue();
    };
};


var q_stack = new QueueStack();
q_stack.push(1);
q_stack.push(2);
q_stack.push(4);
console.log(q_stack.top());   // 栈顶是 4
console.log(q_stack.pop());   // 移除 4
console.log(q_stack.top());   // 栈顶变成 2
console.log(q_stack.pop());   // 移除 2
console.log(q_stack.pop());   // 移除 1