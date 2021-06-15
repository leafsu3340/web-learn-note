/**
 * Created by kwsy on 2018/9/4.
 * 用队列输出杨辉三角的前n行 n >= 1
 */

Queue = require('./myqueue')


function print_yanghui(n){
    var queue = new Queue.Queue();
    queue.enqueue(1);
    // 第一层for循环控制打印几层
    for(var i=1; i<=n; i++){
        var line = "";
        var pre = 0;
        // 第二层for循环控制打印第 i 层
        for(var j=0; j<i; j++){
            var item = queue.dequeue();
            line += item + "  "
            // 计算下一行的内容
            var value = item + pre;
            pre = item;
            queue.enqueue(value);
        }
        // 每一层最后一个数字是1,上面的for循环没有计算最后一个数
        queue.enqueue(1);
        console.log(line);
    }
};

function print_yanghui_2(n){
    var queue = new Queue.Queue();
    queue.enqueue(1);
    queue.enqueue(0);
    for(var i=1; i<=n; i++){
        var line = "";
        var pre = 0;
        while(true){
            var item = queue.dequeue();
            // 用一个0把每一行的数据分割开,遇到0不输出,
            if(item==0){
                queue.enqueue(1);
                queue.enqueue(0);
                break
            }else {
                // 计算下一行的内容
                line += item + "  "
                var value = item + pre;
                pre = item;
                queue.enqueue(value);
            }
        }
        console.log(line);
    }
}


print_yanghui(4);
//print_yanghui_2(10);
