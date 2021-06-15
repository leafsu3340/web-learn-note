/**
 * Created by kwsy on 2018/9/24.
 */


function binary_search(arr, target, start, end){
    if(start > end){
        return -1;    //表示找不到
    }

    var middle = Math.floor((start+end)/2);
    if(arr[middle]==target){
        return middle;
    }else if(arr[middle]> target){
        // 去左侧查找
        return binary_search(arr, target, start, middle-1);
    }else{
        // 去右侧查找
        return binary_search(arr, target, middle+1, end);
    }
}


//var arr = [1, 3, 4, 6, 7, 9, 10];
//console.log(binary_search(arr, 5, 0, arr.length-1));
//console.log(binary_search(arr, 9, 0, arr.length-1));


// 找到第一个比target大的数的位置
function binary_search_bigger(arr, target, start, end) {
    if(arr[start]>target){
        return start;
    }

    if (start > end) {
        return -1;    //表示找不到
    }

    var middle = Math.floor((start+end)/2);
    if(arr[middle]<=target){
        if(arr[middle+1]> target){
            return middle+1;
        }
        return binary_search_bigger(arr, target, middle+1, end);
    }else{
        return binary_search_bigger(arr, target, start, middle-1);
    }
}

var arr = [1, 3, 4, 6, 7, 9, 10];
console.log(binary_search_bigger(arr, 0, 0, arr.length-1));