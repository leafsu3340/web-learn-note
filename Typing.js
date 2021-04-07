/* 原型 继承 */
function Cat(name, color){
	this.name = name;
	this.color = color;
}

Cat.prototype.type = '猫科'
Cat.prototype.eat = function(){
	alert('eat mouse');
}

var cat1 = new Cat('mao', 'red');
var cat2 = new Cat('hei', 'black');

cat1.constructor == Cat  // true;
cat2.constructor == Cat  // true;

cat1.instanceof Cat    // true;
cat2.instanceof Cat    // true;

Cat.prototype.isPrototypeOf cat1  // true
Cat.prototype.isPrototypeOf cat2  // true

cat1.hasOwnProperty('name')   // true
cat1.hasOwnProperty('type')    // false

'name' in cat1 // true
'type' in cat1 // true

// 继承 1.构造函数绑定
function Animal (){ this.species = 'animal' };

function Cat(name, color) {
	Animal.apply(this, arguments);
	this.name = name;
	this.color = color;
}

// 2.prototype模式
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;  // 务必加上这句，否则原型链紊乱

// 3.直接继承prototype
Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat;

// 4.使用空对象作为中介
var F = function(){}
F.prototype = Animal.prototype;
Cat.prototype = new F();
Cat.prototype.constructor = Cat;

// 5.拷贝继承
function extend2(child, parent){
	var p = Parent.prototype;
	var c = child.prototype;
	for(var i in p){
	 c[i] = p[i];
	}
}

//6.ES6 Class 继承
Class Animal (){
	constructor(value){
	this.value = value;
	}
}



















