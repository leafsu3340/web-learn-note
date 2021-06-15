/**
 * Created by kwsy on 2018/9/15.
 */


function UFSets(){
    var parent = [];

    this.init = function(size){
        parent = new Array(size);
        for(var i =0;i<size;i++){
            parent[i] = -1;
        }
    };

    this.find = function(item){
        // 返回item所在集合的集合名
        while(parent[item] >=0){
            item = parent[item];
        }
        return item;
    };

    this.union = function(root1, root2){
        parent[root1] += parent[root2];
        parent[root2] = root1;

    };

    this.build_relation = function(i, j){
        //建立朋友关系
        var root1 = this.find(i);
        var root2 = this.find(j);
        // 不在同一个集合中,就合并到一起
        if(root1 != root2){
            this.union(root1, root2);
        }
    };

    this.is_friend = function(i, j){
        var root1 = this.find(i);
        var root2 = this.find(j);
        return root1 == root2;
    };

    this.get_friend_group_count = function(){
        var count = 0;
        for(var i= 0;i<parent.length;i++){
            if(parent[i]<0){
                count++;
            }
        }
        return count;
    };
};


var friends = [
    [0, 7],
    [1, 6],
    [4, 8],
    [8, 2],
    [9, 0],
    [3, 5],
    [1, 2]
];

var ufset = new UFSets();
ufset.init(10);

for(var i =0;i<friends.length; i++){
    var item = friends[i];
    ufset.build_relation(item[0], item[1]);
}

console.log("朋友圈个数为 "+ufset.get_friend_group_count());
console.log(ufset.is_friend(2, 6));
console.log(ufset.is_friend(6, 8));
console.log(ufset.is_friend(4, 8));
console.log(ufset.is_friend(9, 7));
console.log(ufset.is_friend(2, 4));
console.log(ufset.is_friend(2, 7));
console.log(ufset.is_friend(0, 7));