/**
 * Created by kwsy on 2018/9/17.
 */
const Queue = require("./queue");
var max_value = 9999;
function Graph(){
    var maps = [];
    var node_num = 0;
    var edge_num = 0;
    this.init = function(input_maps){
        maps = input_maps;
        node_num = this.get_node_num();
        edge_num = this.get_edge_num();
    };

    this.get_node_num = function(){
        if(node_num !=0){
            return node_num;
        }
        return maps.length;
    };

    this.get_edge_num = function(){
        if(edge_num !=0){
            return edge_num;
        }
        var count = 0;
        for(var i = 0;i < node_num;i++){
            for(var j = i+1; j< node_num;j++){
                if(maps[i][j]>0 && maps[i][j]<max_value){
                    count++;
                }
            }
        }
        return count;
    };

    this.get_weight = function(u, v){
        return maps[u][v];
    };

    var graph_dfs = function(v, visited, component){
        visited[v] = 1;   //表示v已经访问过
        console.log(v);
        component.push(v);
        var row = maps[v];
        for(var i=0; i<row.length;i++){
            if(row[i]<max_value && visited[i]==0){
                // v 与i 是连通的,且i还没有被遍历过
                graph_dfs(i, visited, component);
            }
        }
    };
    //从顶点v开始深度优先遍历图
    this.dfs = function(v){
        var visited = new Array(node_num);
        var component = [];   //存储连通分量
        for(var i=0;i<node_num;i++){
            visited[i] = 0;
        }
        graph_dfs(v, visited, component);
        return component;
    };

    var graph_bfs = function(v, visited, component){
        var queue = new Queue.Queue();
        queue.enqueue(v);
        visited[v] = 1;   //表示v已经访问过
        console.log(v);
        component.push(v);
        while(!queue.isEmpty()){
            var visited_v = queue.dequeue();
            var row = maps[visited_v];
            for(var i=0; i<row.length;i++){
                if(row[i]<max_value && visited[i]==0){
                    // v 与i 是连通的,且i还没有被遍历过
                    queue.enqueue(i);
                    visited[i] = 1;   //表示v已经访问过
                    console.log(i);
                    component.push(i);
                }
            }
        }
    };

    this.bfs = function(v){
        var visited = new Array(node_num);
        var component = [];
        for(var i=0;i<node_num;i++){
            visited[i] = 0;
        }
        graph_bfs(v, visited, component);
        return component;
    };

    this.components = function(){
        var visited = new Array(node_num);
        var component_lst = [];
        for(var i=0;i<node_num;i++){
            visited[i] = 0;
        }

        for(var i=0;i<node_num;i++){
            if(visited[i]==0){
                var component = [];
                graph_bfs(i, visited, component)
                component_lst.push(component);
            }
        }
        return component_lst;
    };
};

exports.Graph = Graph;




