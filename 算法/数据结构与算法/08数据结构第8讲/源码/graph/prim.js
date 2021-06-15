/**
 * Created by kwsy on 2018/9/19.
 */

const MinHeap = require("./minheap");
const Graph = require("./graph");

var max_value = 9999;

var Edge = function(head, tail, cost){
    this.head = head;
    this.tail = tail;
    this.cost = cost;
};

// 从顶点v开始构建最小生成树
function prim(graph, v){
    var mst = [];
    var node_num = graph.get_node_num();
    var edge_num = graph.get_edge_num();
    var b_mst = new Array(node_num);
    // b_mst标识哪些点已经
    for(var i =0;i<node_num;i++){
        b_mst[i] = 0;
    }
    b_mst[v] = 1;
    var count = 1;
    var start_v = v;
    var min_heap = new MinHeap.MinHeap(edge_num);

    while(count < node_num){
        // 先找到所有start_v 能够到达的顶点
        for(var i = 0;i < node_num;i++) {
            if(b_mst[i]==0){
                var cost = graph.get_weight(start_v, i);
                if(cost != max_value){
                    var ed = new Edge(start_v, i, cost);
                    min_heap.insert(ed);
                }
            }
        }

        while(min_heap.size()!=0){
            var ed = min_heap.remove_min();
            // ed.tail还没有加入到生成树的顶点集合中
            if(b_mst[ed.tail] == 0){
                mst.push(ed);
                start_v = ed.tail;    //新的起点
                b_mst[start_v] = 1;
                count++;
                break;
            }
        }
    }

    return mst;
};

var maps = [
    [0,  28, max_value, max_value, max_value,  10, max_value],
    [28, 0, 16, max_value, max_value,max_value, 14 ],
    [max_value, 16, 0, 12, max_value, max_value, max_value],
    [max_value, max_value, 12, 0, 22, max_value, 18],
    [max_value, max_value, max_value, 22, 0, 25, 24],
    [10, max_value, max_value, max_value, 25, 0, max_value],
    [max_value, 14, max_value, 18, 24, max_value, 0]
];
var graph = new Graph.Graph();
graph.init(maps);

var mst = prim(graph, 1);
console.log(mst);