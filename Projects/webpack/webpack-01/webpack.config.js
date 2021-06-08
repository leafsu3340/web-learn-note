// webpack基于node环境开发的工具
const htmlwebpackplugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  // vue react 是spa mpa?
  entry: {
    index: "./src/index.js",
    test: "./src/test.js",
  },
  //   entry: "./src/index.js",
  output: {
    // 输出的文件名称叫什么
    filename: "[name].js", //[name] 占位符
    // 输出的资源存放位置，绝对路径
    path: path.resolve(__dirname, "./dist"),
  },
  mode: "development", //production none
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // 插件
  //   自动生成html 关联资源文件
  plugins: [
    new htmlwebpackplugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new htmlwebpackplugin({
      template: "./src/test.html",
      filename: "test.html",
      chunks: ["test"],
    }),
  ],
};
