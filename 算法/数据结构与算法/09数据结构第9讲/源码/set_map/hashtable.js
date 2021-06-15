/**
 * Created by kwsy on 2018/9/15.
 */
function murmurhash3_32_gc(key, seed) {
    var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;

    remainder = key.length & 3; // key.length % 4
    bytes = key.length - remainder;
    h1 = seed;
    c1 = 0xcc9e2d51;
    c2 = 0x1b873593;
    i = 0;

    while (i < bytes) {
        k1 =
            ((key.charCodeAt(i) & 0xff)) |
            ((key.charCodeAt(++i) & 0xff) << 8) |
            ((key.charCodeAt(++i) & 0xff) << 16) |
            ((key.charCodeAt(++i) & 0xff) << 24);
        ++i;

        k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
        k1 = (k1 << 15) | (k1 >>> 17);
        k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

        h1 ^= k1;
        h1 = (h1 << 13) | (h1 >>> 19);
        h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
        h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
    }

    k1 = 0;

    switch (remainder) {
        case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
        case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
        case 1: k1 ^= (key.charCodeAt(i) & 0xff);

            k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
            k1 = (k1 << 15) | (k1 >>> 17);
            k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
            h1 ^= k1;
    }

    h1 ^= key.length;

    h1 ^= h1 >>> 16;
    h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
    h1 ^= h1 >>> 13;
    h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
    h1 ^= h1 >>> 16;

    return h1 >>> 0;
}

const LinkList = require("./linklist");
function HashTable(){
    var items = [];          // 存储数据
    var divisor = 7;         // 除数
    var key_count = 0;       // key的数量

    // 判断一个数是否为质数
    var is_Prime = function(number){
        for(var i =2;i<number;i++){
            if(number %i == 0){
                return false;
            }
            return true;
        }
    };

    this.init = function(size){
        items = new Array(size);
        // 初始化数组
        for(var i=0;i< size;i++){
            items[i] = new LinkList.LinkList();
        }
        // 设置除数
        var temp = size;
        while(temp >2){
            if(is_Prime(temp)){
                divisor = temp;
                break;
            }
            temp--;
        }
    };

    var get_index = function(key){
        var tmp_key = key.toString();
        var hash_value = Math.abs(murmurhash3_32_gc(tmp_key, 0));
        return hash_value % divisor;
    };
    var is_too_crowd = function(){
        if(Math.floor(key_count/divisor)>=5){
            return true;
        }
        return false;
    };

    this.expand = function(){
        // 临时数组保存原来的数据
        var tmp_arr = new Array(items.length);
        for(var i=0;i<items.length;i++){
            tmp_arr[i] = items[i];
        }

        // 初始化数组
        items = new Array(items.length*2);
        for(var i=0;i< items.length;i++){
            items[i] = new LinkList.LinkList();
        }

        // 设置除数
        var temp = items.length;
        while(temp >2){
            if(is_Prime(temp)){
                divisor = temp;
                break;
            }
            temp--;
        }

        // 把临时数组里的数据导入到items中
        for(var i =0;i<tmp_arr.length;i++){
            var link = tmp_arr[i];
            // 获得链表的头
            var curr_node = link.get_head();
            while(curr_node){
                this.set(curr_node.key, curr_node.value);
                key_count--;
                curr_node = curr_node.next;
            }
        }
    };

    this.set = function(key, value){
        var index = get_index(key);
        var node = items[index].search(key);
        if(node){
            node.value = value;
        }else{
            items[index].append(key, value);
            key_count++;
        }
        // 如果过于拥挤了就扩容
        if(is_too_crowd()){
            this.expand();
        }
    };

    this.get = function(key){
        var index = get_index(key);
        var node = items[index].search(key);
        if(node){
            return node.value;
        }
        return null;
    };

    this.haskey = function(key){
        var index = get_index(key);
        var node = items[index].search(key);
        if(node){
            return true;
        }
        return false;
    };

    this.del_key = function(key){
        var index = get_index(key);
        var res = items[index].remove_key(key);
        if(res){
            key_count--;
        }
        return res;
    };

    this.size = function(){
        return items.length;
    };

};

var hash_table = new HashTable();
hash_table.init(3);

hash_table.set("name", "javascript");
hash_table.set("age", 20);
hash_table.set("class", 1);

console.log(hash_table.get('name'));
console.log(hash_table.get('age'));
console.log(hash_table.get('class'));
console.log(hash_table.haskey('class'));

hash_table.set("name", "python");
console.log(hash_table.get('name'));


//console.log(hash_table.get('name1'));
//console.log(hash_table.del_key('name'));
//
//console.log(hash_table.get('name'));
//hash_table.set("class", 100);
//console.log(hash_table.get('class'));
//
//
//var hash_table = new HashTable();
//hash_table.init(3);
//
//console.log(hash_table.size());
//for(var i =0;i< 20;i++){
//    hash_table.set(i, i);
//}
//
//for(var i =0;i< 20;i++){
//    console.log(hash_table.get(i));
//}
//
//console.log(hash_table.size());
