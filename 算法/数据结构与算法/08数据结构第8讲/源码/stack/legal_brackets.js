/**
 * Created by kwsy on 2018/8/25.
 * 判断字符串里的括号是否合法
 * "sdf(ds(ew(we)rw)rwqq)qwewe"  合法
 * "(sd(qwqw)sd(sd))"    合法
 * "()()sd()(sd()fw))("  不合法
 */

Stack = require('./mystack')

function is_leagl_brackets(string){
    var stack = new Stack.Stack();
    for(var i=0; i<string.length; i++ ){
        var item = string[i];
        if(item == "("){
            // 将左括号压入栈
            stack.push(item);
        }else if (item==")"){
            // 如果为空,就说明没有左括号与之抵消
            if(stack.isEmpty()){
                return false;
            }else{
                // 将栈顶的元素弹出
                stack.pop();
            }
        }

    }
    return stack.size() == 0;
};

console.log(is_leagl_brackets("()()))"));
console.log(is_leagl_brackets("sdf(ds(ew(we)rw)rwqq)qwewe"));
console.log(is_leagl_brackets("()()sd()(sd()fw))("));