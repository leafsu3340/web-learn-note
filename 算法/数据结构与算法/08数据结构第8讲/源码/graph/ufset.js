/**
 * Created by kwsy on 2018/9/19.
 */

function UFSets(size){
    var parent = new Array(size);
    for(var i =0;i<size;i++){
        parent[i] = -1;
    }

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

};

exports.UFSets = UFSets;