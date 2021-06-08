import css from "./css/index.less";
import pic from "./images/logo.png";
// 需要借助的loader file-loader url-loader

// 使用图片的方式
// 1.html img标签
// 2. js dom操作
// 3. css 引入

// 图片的名称
// 路径问题
// console.log(pic);
// const img = new Image();
// img.src = pic;

// const root = document.getElementById("app");
// root.append(img);

// 集成第三方图标、字体

// hash chunkhash contenthash 三种指纹策略的使用和区别
// hash 内容发生变化会更新一次，没有变化则不更新
// hash指纹策略的范围 是项目

// chunkhash 范围是根据chunk
console.lg("hello webpack!!!!!!!");
// 项目开发期间
// 项目上线 迭代更能是频繁的

// contenthash 自身内容

// 多页面打包通用方案
