/**
 * Created by kwsy on 2018/9/19.
 */


function MinHeap(size){
    var heap = new Array(size);    // 数组
    var curr_size = 0;             // 当前堆的大小
    var max_size = size;           // 堆最大容量


    var shif_down = function(start, m){
        // 从start这个位置开始,向下下滑调整
        var parent_index = start;                       // start就是当前这个局部的父节点
        var min_child_index = parent_index*2 + 1;       // 一定有左孩子,先让min_child_index等于左孩子的索引

        while(min_child_index <= m){
            // min_child_index+1 是左孩子的索引, 左孩子大于右孩子
            if(min_child_index < m && heap[min_child_index].cost > heap[min_child_index+1].cost){
                min_child_index = min_child_index+1;  // min_child_index永远指向值小的那个孩子
            }

            // 父节点的值小于等于两个孩子的最小值
            if(heap[parent_index].cost <= heap[min_child_index].cost){
                break;   // 循环结束,不需要再调整了
            }else{
                // 父节点和子节点的值互换
                var tmp = heap[parent_index];
                heap[parent_index] = heap[min_child_index];
                heap[min_child_index] = tmp;
                parent_index = min_child_index;
                min_child_index = 2*min_child_index + 1;
            }
        }

    };

    // 传入一个数组,然后调整为最小堆
    this.init = function(arr){
        max_size = arr.length;
        curr_size = max_size;
        heap = new Array(arr.length);
        // 填充heap, 目前还不是一个堆
        for(var i =0; i<curr_size;i++){
            heap[i] = arr[i];
        }

        var curr_pos = Math.floor((curr_size-2)/2);      // 这是堆的最后一个分支节点
        while(curr_pos >= 0){
            shif_down(curr_pos, curr_size-1);            // 局部自上向下下滑调整
            curr_pos -= 1;                               // 调整下一个分支节点
        }
    };

    var shif_up = function(start){
        var child_index = start;         // 当前节点是叶节点
        var parent_index = Math.floor((child_index-1)/2);   // 找到父节点


        while(child_index > 0){
            // 父节点更小,就不用调整了
            if(heap[parent_index].cost <= heap[child_index].cost){
                break;
            }else{
                // 父节点和子节点的值互换
                var tmp = heap[child_index];
                heap[child_index] = heap[parent_index];
                heap[parent_index] = tmp;
                child_index = parent_index;
                parent_index = Math.floor((parent_index-1)/2);
            }
        }
    };

    this.insert = function(item){
        // 插入一个新的元素
        // 堆满了,不能再放元素
        if(curr_size == max_size){
            return false;
        }

        heap[curr_size] = item;
        shif_up(curr_size);
        curr_size++;
        return true;
    };

    //删除最小值
    this.remove_min = function(){
        if(curr_size <= 0){
            return null;
        }
        var min_value = heap[0];
        heap[0] = heap[curr_size-1];
        curr_size--;
        shif_down(0, curr_size-1);
        return min_value;
    };

    this.size = function(){
        return curr_size;
    };

    this.print = function(){
        console.log(heap);
    };

    this.get_min = function(){
        if(curr_size > 0){
            return heap[0];
        }
        return null;
    }
};


exports.MinHeap = MinHeap;