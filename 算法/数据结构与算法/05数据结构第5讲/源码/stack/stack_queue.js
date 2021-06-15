/**
 * Created by kwsy on 2018/9/6.
 * 用两个栈实现一个队列
 */


const Stack = require('./mystack.js')
function StackQueue(){
    var stack_1 = new Stack.Stack();
    var stack_2 = new Stack.Stack();

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