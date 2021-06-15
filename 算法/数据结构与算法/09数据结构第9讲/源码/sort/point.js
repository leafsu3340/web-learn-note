/**
 * Created by kwsy on 2018/9/24.
 */

var points = [
    [1.24, 2.56],
    [2.47, 5.84],
    [6.27, 1.46],
    [9.32, 4.98],
    [5.21, 5.23],
    [4.23, 1.23],
    [6.29, 3.67],
    [4.23, 8.34],
    [3.21, 4.68],
    [2.61, 4.23],
    [4.78, 7.35],
    [8.34, 2.57],
    [7.32, 3.58],
    [0.32, 3.94]
];

var Point = function(x, y){
    this.x = x;
    this.y = y;
};

function MyMap(){
    var map = [];
    for(var i =0;i<10;i++){
        map.push(new Array(10));
    }

    for(var i =0;i<10;i++){
        for(var j =0;j<10;j++){
            map[i][j]= [];
        }
    }

    this.add_point = function(x, y){
        var point = new Point(x, y);
        var index_1 = Math.floor(x);
        var index_2 = Math.floor(y);
        map[index_1][index_2].push(point);
    };

    var get_dis = function(x1, y1, x2, y2){
        return Math.sqrt(Math.pow(Math.abs(x1-x2),2) + Math.pow(Math.abs(y1-y2), 2));
    };

    var get_index = function(index){
        if(index<0){
            return 0;
        }
        if(index>=10){
            return 9;
        }
        return index;
    };

    // 寻找距离(x,y)在dis以内的所有点
    this.search = function(x, y, dis){
        var point_arr = []
        // 缩小计算范围
        var x_start = get_index(Math.floor(x-dis));
        var x_end = get_index(Math.floor(x+dis));
        var y_start = get_index(Math.floor(y-dis));
        var y_end = get_index(Math.floor((y+dis)));
        for(var i=x_start; i<=x_end;i++){
            for(var j=y_start;j<=y_end;j++){
                var points = map[i][j];
                for(var k=0;k<points.length;k++){
                    if(get_dis(x,y, points[k].x, points[k].y)<=dis){
                        point_arr.push(points[k]);
                    }
                }
            }
        }

        return point_arr;
    }
};

var map = new MyMap();
for(var i= 0;i< points.length;i++){
    map.add_point(points[i][0], points[i][1]);
}

var points = map.search(3, 3, 2);
for(var i=0;i<points.length;i++){
    console.log(points[i]);
}