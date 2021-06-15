/**
 * Created by kwsy on 2018/9/24.
 */


// pillar_A上有n个圆盘,现在要将圆盘移动到pillar_C上,借助pillar_B
function hanoi(n, pillar_A, pillar_B, pillar_C){
    if(n==1){
        console.log("move: "+ pillar_A + "---->" + pillar_C);
    }
    else{
        // 借助pillar_C,将A上n-1个圆盘移动到pillar_B
        hanoi(n-1, pillar_A, pillar_C, pillar_B);
        // 将A上最后一个圆盘移动到pillar_C
        console.log("move: "+ pillar_A + "---->" + pillar_C);
        // 借助pillar_A, 将B上n-1个圆盘移动到pillar_C
        hanoi(n-1, pillar_B, pillar_A, pillar_C);
    }
}

hanoi(3, "A", "B", "C");