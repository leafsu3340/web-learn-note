/**
 * Created by kwsy on 2018/8/25.
 * 实现calc_exp函数,计算逆波兰表达式
 * ["4", "13", "5", "/", "+"] 等价于(4 + (13 / 5)) = 6
 * ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]
 * 等价于((10 * (6 / ((9 + 3) * -11))) + 17) + 5
 */
const Stack = require('./mystack.js')

function calc_exp(exp){
    var stack = new Stack.Stack();
    for(var i = 0; i < exp.length;i++){
        var item = exp[i];

        if(["+", "-", "*", "/"].indexOf(item) >= 0){
            // 从栈顶弹出两个元素
            var value_1 = stack.pop();
            var value_2 = stack.pop();
            // 拼成表达式
            var exp_str = value_2 + item + value_1;
            // 计算并取整
            var res = parseInt(eval(exp_str));
            // 将计算结果压如栈
            stack.push(res.toString());
        }else{
            stack.push(item);
        }
    }
    // 表达式如果是正确的,最终,栈里还有一个元素,且正是表达式的计算结果
    return stack.pop();
};


var exp_1 = ["4", "13", "5", "/", "+"];
var exp_2 = ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"];
var exp_3 = [ '1', '4', '5', '+', '3', '+', '+', '3', '-', '9', '8', '+', '+' ];
console.log(calc_exp(exp_1));
console.log(calc_exp(exp_2));
console.log(calc_exp(exp_3));
