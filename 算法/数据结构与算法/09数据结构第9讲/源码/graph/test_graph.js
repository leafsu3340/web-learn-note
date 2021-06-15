/**
 * Created by kwsy on 2018/9/19.
 */


const Graph = require("./graph");

function test_bfs(){
    var max_value = 9999;
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
    var component = graph.bfs(6);
    console.log(component);

};

function test_dfs(){
    var max_value = 9999;
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
    var component = graph.dfs(6);
    console.log(component);
};

function test_components(){
    var max_value = 9999;
    var maps = [
        [0,  28, max_value, max_value, max_value,  10, max_value, max_value, max_value],
        [28, 0, 16, max_value, max_value,max_value, 14, max_value, max_value],
        [max_value, 16, 0, 12, max_value, max_value, max_value, max_value, max_value],
        [max_value, max_value, 12, 0, 22, max_value, 18, max_value, max_value],
        [max_value, max_value, max_value, 22, 0, 25, 24, max_value, max_value],
        [10, max_value, max_value, max_value, 25, 0, max_value, max_value, max_value],
        [max_value, 14, max_value, 18, 24, max_value, 0, max_value, max_value],
        [max_value, max_value, max_value, max_value, max_value, max_value,max_value, 0, 9],
        [max_value, max_value, max_value, max_value, max_value, max_value,max_value, 9, 0]
    ];

    var graph = new Graph.Graph();
    graph.init(maps);
    var component_ls = graph.components();
    console.log(component_ls);
};

//test_dfs();
// test_bfs();
test_components();