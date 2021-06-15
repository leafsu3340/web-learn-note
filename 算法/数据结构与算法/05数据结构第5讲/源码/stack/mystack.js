/**
 * Created by kwsy on 2018/8/25.
 * 定义一个Stack类,实现栈这种数据结构
 */

function Stack() {
    var items = [];  // 使用数组存储数据

    // push方法向栈里压入一个元素
    this.push = function(item){
        items.push(item);
    };

    // pop方法把栈顶的元素弹出
    this.pop = function(){
        return items.pop();
    };

    // top 方法返回栈顶元素
    this.top = function(){
        return items[items.length - 1];
    };

    // isEmpty返回栈是否为空
    this.isEmpty = function(){
        return items.length == 0;
    };

    // size方法返回栈的大小
    this.size = function(){
        return items.length;
    };

    // clear 清空栈
    this.clear = function(){
        items = []
    };
}

exports.Stack = Stack;


function StackQueue(){
    var stack_1 = new Stack();
    var stack_2 = new Stack();

    // 总是把数据放入到stack_1中
    this.enqueue = function(item){
        stack_1.push(item);
    };

    // 获得队列的头
    this.head = function(){
        // 两个栈都是空的
        if(stack_2.isEmpty() && stack_1.isEmpty()){
            return null;
        }

        // 如果stack_2 是空的,那么stack_1一定不为空,把stack_1中的元素倒入stack_2
        if(stack_2.isEmpty()){
            while(!stack_1.isEmpty()){
                stack_2.push(stack_1.pop());
            }
        }
        return stack_2.top();
    };

    // 出队列
    this.dequeue = function(){
        // 两个栈都是空的
        if(stack_2.isEmpty() && stack_1.isEmpty()){
            return null;
        }

        // 如果stack_2 是空的,那么stack_1一定不为空,把stack_1中的元素倒入stack_2
        if(stack_2.isEmpty()){
            while(!stack_1.isEmpty()){
                stack_2.push(stack_1.pop());
            }
        }
        return stack_2.pop();
    };

};


var sq = new StackQueue();
sq.enqueue(1);
sq.enqueue(4);
sq.enqueue(8);
console.log(sq.head());
sq.dequeue();
sq.enqueue(9);
console.log(sq.head());
sq.dequeue();
console.log(sq.head());
console.log(sq.dequeue());
console.log(sq.dequeue());
