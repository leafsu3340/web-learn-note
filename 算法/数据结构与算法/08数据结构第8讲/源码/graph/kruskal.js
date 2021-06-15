/**
 * Created by kwsy on 2018/9/19.
 */
const MinHeap = require("./minheap");
const UFSets = require("./ufset");
const Graph = require("./graph");

var max_value = 9999;

var Edge = function(head, tail, cost){
    this.head = head;
    this.tail = tail;
    this.cost = cost;
};


function kruskal(graph){
    var mst = [];
    var node_num = graph.get_node_num();
    var edge_num = graph.get_edge_num();
    var min_heap = new MinHeap.MinHeap(edge_num);
    var ufset = new UFSets.UFSets(node_num);

    for(var i = 0;i < node_num;i++) {
        for (var j = i + 1; j < node_num; j++) {
            var cost = graph.get_weight(i, j);
            if(cost != max_value){
                var ed = new Edge(i, j, cost);
                min_heap.insert(ed);
            }
        }
    }

    var count = 1;
    while(count<node_num){
        var ed = min_heap.remove_min();
        var head_root = ufset.find(ed.head);
        var tail_root = ufset.find(ed.tail);
        if(head_root != tail_root){
            ufset.union(head_root, tail_root);
            mst.push(ed);
            count++;
        }else{
            console.log("构成环路");
            console.log(ed);
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

var mst = kruskal(graph);
console.log(mst);


