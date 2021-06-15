/**
 * Created by kwsy on 2018/9/24.
 */

// 合并两个有序数组
function merge(arr1, arr2){
    var merge_arr = [];
    var index_1 = 0;
    var index_2 = 0;

    while(index_1<arr1.length && index_2<arr2.length){
        // 哪个数组的头部元素小,就合并谁,然后更新头的位置
        if(arr1[index_1]<=arr2[index_2]){
            merge_arr.push(arr1[index_1]);
            index_1++;
        }else{
            merge_arr.push(arr2[index_2]);
            index_2++;
        }
    }

    // arr1有剩余
    if(index_1<arr1.length){
        while(index_1<arr1.length){
            merge_arr.push(arr1[index_1]);
            index_1++;
        }
    }

    // arr2有剩余
    if(index_2<arr2.length){
        while(index_2<arr2.length){
            merge_arr.push(arr2[index_2]);
            index_2++;
        }
    }

    return merge_arr;
};


function merge_sort_ex(arr, start, end){
    if(start < end){
        // 分
        var middle = Math.floor((start+end)/2);
        var arr1 = merge_sort_ex(arr, start, middle);
        var arr2 = merge_sort_ex(arr, middle+1, end);
        // 治
        return merge(arr1, arr2);
    }
    return [arr[end]];
};

function merge_sort(arr){
    return merge_sort_ex(arr, 0, arr.length-1);
};


var arr = [7, 2, 8, 1, 4, 6, 9, 3];
console.log(merge_sort(arr));