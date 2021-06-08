// const webpack = require("webpack");
// const options = require("../webpack.config.js");

// const compiler = webpack(options);
// Object.keys(compiler.hooks).forEach((hookName) => {
//   compiler.hooks[hookName].tap("kkb", () => {
//     console.log(`run ------> ${hookName}`);
//   });
// });

// compiler.run();

// const arr = [new Promise(() => {}), new Promise(() => {})];
// import React from "react";
// import ReactDom from "react-dom";

// class App extends React.Component {
//   render() {
//     return <div>hello webpack</div>;
//   }
// }

// ReactDom.render(<App />, document.getElementById("app"));

// import css from "./css/index.less";
// import pic from "./images/logo.png";
// import axios from "axios";

// axios.get("/api/info").then((res) => {
//   console.log(res);
// });
// console.log("hello webpack!!!!!!!");

// sourceMap
// 源代码与打包后的代码的关系映射;
// eval : 速度最快，使用eval包裹模块代码
// source-map : 产生.map文件
// inline ： 将.map的信息以dataURL方式嵌入
// cheap ： 只精确到行数
// module ： 第三方模块，包含loader的sourcemap(jsx to js)

// eval-cheap-inline-source-map

// 开发环境推荐配置

// 生产环境推荐配置

// webpack-dev-server
// 开发环境下提升开发效率的神器
// 热更新 修改内容不需要再次打包
// 自动打开一个浏览器窗口
// 模拟数据
// 前后端分离开发模式
// x业务线
// 搞活动
// UI 前端（约定接口文档，接口字段）后端 测试 产品

// HMR
// Babel
// env; 原生JS的语法处理
// flow; 支持flow to JS
// react; JSX to JS
// typescript; TS to JS

// polyfill 垫片 js库

// 按需加载

// useBuiltIns: false entry usage
// entry: 需要在入口文件里import "@bable/polyfill" 一次。babel就会根据你的使用情况，导入相应的垫片。没有使用到的特性，就会被排除掉。
// uasge: 不需要import,全自动检测，
// false: 不会排除掉未使用到的垫片。会导致体积庞大

// 如何编写一个plugin

// 作业：

// 实现一个文件清单插件
// 我希望每次webpack打包后，自动生成一个打包文件清单，txt格式，
// 文件内容有记录，本次打包生成的文件数量，和对应的文件名称。
