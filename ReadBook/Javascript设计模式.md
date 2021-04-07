## 工厂模式
function createPop(type, text){
　 // 创建—个对象，并对对象拓展属性和方法
　 var o = new object()；
  o.content = text；
　 o.show = function(){
　　// 显示方法
　 }；
　 if(type == 'alert'){
　　// 警示框差异部分
　 }
　 if(type == 'prompt'){
　　// 提示框差异部分
　 }
　 if(type == 'confirm'){
　　// 确认框差异部分
　 }
　 // 将对象返回
　 return o；
}
　

工厂方法模式本意是说将实际创建对象工作推迟到子类当中。这样核心类就成了抽象类

// 安全模式创建的工厂类
var Factory = function(type, content){
　 if(this instanceof Factory){
　　var s = new this[type](content)；
　　return s；
　 }else{
　　return new Factory(type, content)；
　 }
}

　// 工厂原型中设置创建所有类型数据对象的基类
Factory.prototype = {
　 Java：function(content){},
　 Javascript：function(content){//...}
  ...
}


## 抽象工厂模式
是设计模式中最抽象的一种，也是创建模式中唯一一种抽象化创建模式。
该模式创建出的结果不是一个真实的对象实例，而是一个类簇，它制定了类的结构，
这也就区别于简单工厂模式创建单一对象，工厂方法模式创建多类对象。
当然由于JavaScript中不支持抽象化创建与虚拟方法，
所以导致这种模式不能像其他面向对象语言中应用得那么广泛。


## 原型模式
这种模式是JavaScript语言的灵魂，在JavaScript中很多面向对象编程思想
或者设计模式都是基于原型模式继承实现的。


## 单例模式（Singleton）：
又被称为单体模式，是只允许实例化一次的对象类。
JavaScript 中单例模式除了定义命名空间外，还有一个作用你需要知道，就是通过单例模式来管理代码库的各个模块。
var conf = (function(){
　 // 私有变量
　 var conf = {
　　  MAX_NUM：100,
　　  MIN_NUM：1,
　　  coUNT：1000
　 }
　 // 返回取值器对象
  return {
　　  // 取值器方法
　　  get：function(name){
　　   return conf[name] ? conf[name]：null；
　　  }
  }
　})()；
如果你想让系统中只存在一个对象，那么单例模式则是最佳解决方案。


## 外观模式实现
//  提供“套餐”高级接口提供调用
function addEvent(dom, type, fn){
　 // 对于支持DoM2级事件处理程序addEventListener方法的浏览器
　 if(dom.addEventListener){
　　  dom.addEventListener(type, fn, false)；
　 // 对于不支持addEventListener方法但支持attachEvent方法的浏览器
　 }else if(dom.attachEvent){
　　  dom.attachEvent('on' + type, fn)；
　 // 对于不支持addEventListener方法也不支持attachEvent方法，但支持on+'事件名'的浏览器
　 }else{
　　  dom['on' + type] = fn；
　 }
}


JavaScript 中的适配器的应用，更多应用在对象之间，为了使对象可用，
通常我们会将对象拆分并重新包装，这样我们就要了解适配对象的内部结构，
这也是与外观模式的区别所在，当然适配器模式同样解决了对象之间的耦合度。
包装的适配器代码增加了一些资源开销，当然这是微乎其微的。











