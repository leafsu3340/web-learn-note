/**
 * Created by kwsy on 2018/9/24.
 */
const LinkList = require("./linklist.js");
var Node = function(v){
    this.v = v;
    this.edge_link = new LinkList.LinkList();
};

function Graph(){
    var nodetable = [];

    var find_data_node = function (v) {
        var index = find_index(v);
        if(index>=0){
            return nodetable[index];
        }
        return null;
    };

    var find_index = function(v){
        for(var i =0;i< nodetable.length;i++){
            if(v == nodetable[i].v){
                return i;
            }
        }
        return -1;
    };

    this.add_v = function(v){
        if(find_index(v) >=0){
            return false;
        }else{
            nodetable.push(new Node(v));
        }
    };

    this.add_edge = function(start, end){
        var data_node = find_data_node(start);
        var end_index = find_index(end);
        if(data_node && end_index>=0){
            return data_node.edge_link.append(end_index);
        }
        return false;
    };
    this.print = function(){
        for(var i=0;i<nodetable.length;i++){
            console.log(nodetable[i].v);
            nodetable[i].edge_link.print();
        }
    };

};

var edge_arr = [
    ["A", "B"],
    ["A", "D"],
    ["A", "E"],
    ["B", "C"],
    ["C", "A"],
    ["D", "E"],
    ["E", "B"]
];

var graph = new Graph();
for(var i=0;i< edge_arr.length; i++){
    for(var j=0;j< edge_arr[i].length;j++){
        graph.add_v(edge_arr[i][j]);
    }
}

for(var i=0;i< edge_arr.length; i++){
    graph.add_edge(edge_arr[i][0], edge_arr[i][1])
}

graph.print();