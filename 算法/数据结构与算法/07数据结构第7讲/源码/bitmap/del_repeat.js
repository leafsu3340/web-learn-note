/**
 * Created by kwsy on 2018/9/6.
 * 利用bitmap去重
 *
 */

const BitMap = require('./bitmap.js');

var arr_1 = [1, 3, 4, 5, 8, 4, 2, 6, 7, 8, 1, 4, 6, 9];

// 假设已经知道arr_1的最大值小于32
function del_repeat(arrlist){
    var max = -1;
    for(var i = 0;i < arrlist.length; i++){
        if(arrlist[i] > max){
            max = arrlist[i];
        }
    }

    var size = Math.ceil(max/32);
    var bitmap = new BitMap.BitMap(size);
    var arr = [];

    for(var i = 0;i < arrlist.length; i++){
        bitmap.addMember(arrlist[i]);
    }

    for(var i=0; i<= max; i++){
        if(bitmap.isExist(i)){
            arr.push(i);
        }
    }

    return arr;
};


console.log(del_repeat(arr_1));