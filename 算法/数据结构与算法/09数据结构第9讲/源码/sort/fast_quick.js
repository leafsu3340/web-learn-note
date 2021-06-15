/**
 * Created by kwsy on 2018/9/24.
 */

function insert_sort(arr, start, end){
    for(var i= start+1; i<=end;i++){
        // 假设从arr[0]到arr[i-1]已经有序,那么只需要比较arr[i]和arr[i-1]的大小即可
        if(arr[i]<arr[i-1]){
            var tmp = arr[i];
            var j = i-1;
            // 找到tmp应该在的位置
            while(j>=start && tmp<arr[j]){
                arr[j+1] = arr[j];
                j--;
            }
            arr[j+1] = tmp;
        }
    }
};


// 取arr[start]为基准值,将start到end这个区域进行分区
function partition(arr, start, end){
    var pivotpos = start;
    var pivot = arr[start];

    for(var i =start + 1;i<=end; i++){
        if(arr[i] < pivot){
            pivotpos++;
            if(pivotpos!=i){
                // 将小于基准的值交换到左侧
                var temp = arr[pivotpos];
                arr[pivotpos] = arr[i];
                arr[i] = temp;
            }
        }
    }
    arr[start] = arr[pivotpos];
    arr[pivotpos] = pivot;

    return pivotpos;
};

function quick_sort_ex(arr, start, end){
    if(start < end){
        if(end-start <=25){
            insert_sort(arr, start, end);
        }else {
            var pivotpos = partition(arr, start, end);
            quick_sort_ex(arr, start, pivotpos - 1);
            quick_sort_ex(arr, pivotpos + 1, end);
        }
    }
}

function quick_sort(arr){
    quick_sort_ex(arr, 0, arr.length-1);
}


var arr = [7, 2, 8, 1, 4, 6, 9, 3];
quick_sort(arr, 0, arr.length-1);
console.log(arr);