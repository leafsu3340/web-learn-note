/**
 * Created by kwsy on 2018/9/8.
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