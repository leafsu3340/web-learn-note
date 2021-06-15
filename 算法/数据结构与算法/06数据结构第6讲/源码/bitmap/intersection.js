/**
 * Created by kwsy on 2018/9/9.
 * 两个数组取交集
 */

const BitMap = require('./bitmap.js');


var arr1 = [1, 4, 6, 8, 9, 10, 15];
var arr2 = [6, 14, 9, 2, 0, 7];
var intersection_arr = []

var bit_map = new BitMap.BitMap();

for(var i = 0;i<arr1.length; i++){
    bit_map.addMember(arr1[i]);
}

for(var i= 0;i<arr2.length; i++){
    if(bit_map.isExist(arr2[i])){
        intersection_arr.push(arr2[i]);
    }
}

console.log(intersection_arr);