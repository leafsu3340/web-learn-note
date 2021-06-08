import css from "./css/index.less";
// spa mpa
// 团队合作 还是 单兵作战
// 样式部分
// 原生的样式-less/sass/stylus/postcss
// JS部分
// es6+ vue react ts
// html模板引擎
// pug ejs 原生的html
console.log("hello webpack"); //您好 kkb

// babel 处理JS
// postcss 处理css

// browserslist ： 声明浏览器的集合，设置目标浏览器的工具

// 使用场景：1 package.json
// 使用场景：2 .browserslistrc配置文件
// last 2 versions", 兼容浏览器最近两个版本 " >1%" 兼容市场占有率大于1%的浏览器 全球市场
// IE 浏览器最新的版本是啥？ 11 10 ie浏览器的升级都是独立的！！

// browserslist浏览器集合的写法
// last 2 versions ---> last 1 version
//  >1% (>5% in US)
// firefox > 45 指定浏览器版本范围
// ie 6-8 指定浏览器版本范围
// not ie < 11 排除ie11以下版本
// dead 全球使用低于0.5%，而且官网声明 不在维护已经两年以上

// and_chr 88
// and_ff 86
// and_qq 10.4
// and_uc 12.12
// android 81
// baidu 7.12
// bb 10
// bb 7
// chrome 89
// chrome 88
// chrome 87
// edge 89
// edge 88
// firefox 86
// firefox 85
// ie 11
// ie 10
// ie_mob 11
// ie_mob 10
// ios_saf 14.0-14.4
// ios_saf 13.4-13.7
// kaios 2.5
// op_mini all
// op_mob 62
// op_mob 12.1
// opera 73
// opera 72
// safari 14
// safari 13.1
// samsung 13.0
// samsung 12.0

// css 优化
// 1.去掉冗余
// 2.压缩

// 如何实现自定义loader

// 作业：实现less-loader css-loader style-loader的核心功能，
// 让webpack支持less模块。！
