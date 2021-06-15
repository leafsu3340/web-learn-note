/**
 * Created by kwsy on 2018/9/9.
 * 支持负整数的操作
 */

const BitMap = require('./bitmap.js');

function SuperBitMap(size){
    var positive_bit_map = new BitMap.BitMap(size);
    var negative_bit_map = new BitMap.BitMap(size);

    this.addMember = function(member){
        if(member >= 0){
            positive_bit_map.addMember(member);
        }else{
            negative_bit_map.addMember(member);
        }
    };

    this.isExist = function(member){
        if(member >= 0){
            return positive_bit_map.isExist(member);
        }else{
            return negative_bit_map.isExist(member);
        }
    };
}

var arr = [1, 3 ,-6, -8, 8, 9];
var super_bm = new SuperBitMap();

for(var i =0;i<arr.length;i++){
    super_bm.addMember(arr[i]);
}

console.log(super_bm.isExist(-8));
console.log(super_bm.isExist(8));
console.log(super_bm.isExist(9));
console.log(super_bm.isExist(-6));
console.log(super_bm.isExist(-5));