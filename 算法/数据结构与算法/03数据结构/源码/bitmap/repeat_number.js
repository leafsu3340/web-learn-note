/**
 * Created by kwsy on 2018/9/6.
 * 有一个数组,存储了非常多正整数,其中有一些是重复出现的
 * 请找出那些不重复出现的数
 */


function BitMap(size){
    var bit_arr = new Array(size);
    for(var i=0;i<bit_arr.length;i++){
        bit_arr[i] = 0;
    }

    this.addMember = function(member){
        var arr_index = Math.floor(member / 16);      // 决定在数组中的索引
        var bit_index = member % 16;                  // 决定在整数的32个bit位的哪一位上
        if(!this.isExist(member)){
            bit_arr[arr_index] = bit_arr[arr_index] | 1<<bit_index*2;
        }else{
            bit_arr[arr_index] = bit_arr[arr_index] | 1<<(bit_index*2+1);
        }
    };

    this.isExist = function(member){
        var arr_index = Math.floor(member / 16);      // 决定在数组中的索引
        var bit_index = member % 16;                  // 决定在整数的32个bit位的哪一位上
        var value = bit_arr[arr_index] & 1<<bit_index*2;
        if(value != 0){
            return true;
        }
        return false;
    };

    this.isRepeat = function(member){
        var arr_index = parseInt(member / 16);      // 决定在数组中的索引
        var bit_index = member % 16;     // 决定在整数的32个bit位的哪一位上
        var value = bit_arr[arr_index] & 1<<(bit_index*2 + 1);
        if(value != 0){
            return true;
        }
        return false;
    };
}

var arr_1 = [1, 3, 4, 5, 7, 4, 8, 9, 2, 9];

var bm = new BitMap(2);
for(var i = 0; i < arr_1.length; i++){
    bm.addMember(arr_1[i]);
}

var arr = []
for(var i = 0; i <=9; i++){
    if(!bm.isRepeat(i)){
        arr.push(i);
    }
}

console.log(arr);