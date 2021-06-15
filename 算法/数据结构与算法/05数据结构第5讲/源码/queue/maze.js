/**
 * Created by kwsy on 2018/9/4.
 */

Queue = require('./myqueue')

// 起始点是maze_array[2][1], 终点是 maze_array[3][5]
var maze_array = [[0, 0, 1, 0, 0, 0, 0],
                  [0, 0, 1, 1, 0, 0, 0],
                  [0, 0, 0, 0, 1, 0, 0],
                  [0, 0, 0, 1, 1, 0, 0],
                  [1, 0, 0, 0, 1, 0, 0],
                  [1, 1, 1, 0, 0, 0, 0],
                  [1, 1, 1, 0, 0, 0, 0]
                 ];


var Node = function(x, y){
    this.x = x;
    this.y = y;
    this.step = 0;
};

var Position = function(x, y){
    this.x = x;
    this.y = y;
}

function find_position(pos, maze){
    var x = pos.x;
    var y = pos.y;
    var pos_arr = [];
    // 上面的点
    if(x-1 >= 0){
        pos_arr.push(new Position(x-1, y));
    }
    // 右面的点
    if(y+1 < maze[0].length){
        pos_arr.push(new Position(x, y+1));
    }
    // 下面的点
    if(x+1 < maze.length){
        pos_arr.push(new Position(x+1, y));
    }
    // 左面的点
    if(y-1 >= 0){
        pos_arr.push(new Position(x, y-1));
    }
    return pos_arr;
};

function print_node(maze_node){
    for(var i = 0; i<maze_node.length;i++){
        var arr = [];
        for(var j =0;j<maze_node[i].length;j++){
            arr.push(maze_node[i][j].step);
        }
        console.log(arr);
    }
}

function find_path(maze, start_pos, end_pos){

    var maze_node = [];
    for(var i = 0; i< maze_array.length; i++){
        var arr = maze_array[i];
        var node_arr = [];
        for(var j =0; j< arr.length; j++){
            var node = new Node(i, j);
            node_arr.push(node);
        }
        maze_node.push(node_arr);
    }

    var queue = new Queue.Queue();
    queue.enqueue(start_pos);
    var b_arrive = false;
    var max_step = 0;
    while(true){
        var position = queue.dequeue();
        var pos_arr = find_position(position, maze)
        for(var i =0; i<pos_arr.length; i++){
            var pos = pos_arr[i];
            // 判断是否到达终点
            if(pos.x == end_pos.x && pos.y==end_pos.y){
                b_arrive = true;
                max_step = maze_node[position.x][position.y].step;
                break;
            }
            // 起始点
            if(pos.x == start_pos.x && pos.y == start_pos.y){
                continue;
            }
            // 不能通过
            if(maze[pos.x][pos.y]==1){
                continue;
            }
            // 已经标识过步数
            if(maze_node[pos.x][pos.y].step > 0){
                continue;
            }
            // 这个点的步数加 1
            maze_node[pos.x][pos.y].step = maze_node[position.x][position.y].step + 1;
            queue.enqueue(pos);
        }
        //到达终点了
        if(b_arrive){
            break
        }

        if(queue.isEmpty()){
            break;
        }
    }


    var path = [];
    if(b_arrive){
        // 能够找到路径
        path.push(end_pos);
        var old_pos = end_pos;
        var step = max_step;
        while(step >0){
            var pos_arr = find_position(old_pos, maze);
            for(var i =0; i<pos_arr.length; i++) {
                var pos = pos_arr[i];

                if(maze_node[pos.x][pos.y].step == step){
                    step -= 1;
                    old_pos = pos;
                    path.push(pos);
                    break;
                }
            }
        }
        path.push(start_pos);
    }

    console.log(path.reverse());


};



var start_pos = new Position(2, 1);
var end_pos = new Position(3, 5);

find_path(maze_array, start_pos, end_pos);