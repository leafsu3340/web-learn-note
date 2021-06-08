import { str } from "./b.js"; //依赖的路径
console.log("我是Index");

const webpack = require("webpack");
const options = require("../webpack.config.js");
const compiler = webpack(options);
compiler.run();

// 模块是否有依赖，有的话，记录依赖的路径
// 处理模块的内容 编译

// {
//  模块依赖图谱
// }

/***** 创建webpackbootstrap 函数
(function (moudles) {
     补齐缺失的函数和属性
 })({ 模块依赖图谱 });
****/
