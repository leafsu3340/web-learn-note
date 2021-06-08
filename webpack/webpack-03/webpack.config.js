const path = require("path");
const MiNiCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
    list: "./src/list.js",
    login: "./src/login.js",
  },
  output: {
    filename: "js/[name].js?[hash:6]",
    path: path.resolve(__dirname, "./dist"),
    // publicPath: "http://www.baidu.com",
  },
  mode: "development",
  resolveLoader: {
    modules: ["./node_modules", "./myLoaders"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          MiNiCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: {
          loader: "url-loader",
          options: {
            // name 图片的名称
            // ext 图片的后缀格式
            name: "[name].[ext]",
            outputPath: "images",
            publicPath: "../images/", //图片的路径+图片名称
            // outputPath publicPath 区别
            // outputPath: 决定图片存放位置
            // publicPath: 决定图片的引用位置，css中如何引用图片的路径
            limit: 3 * 1024, //大于3kb，独立文件的形式，小于3kb，base64格式
          },
        },
      },
      {
        test: /\.(woff|woff2|eot)$/,
        use: {
          loader: "file-loader",
          options: {
            publicPath: "../",
          },
        },
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new htmlWebpackPlugin({
      template: "./src/list.html",
      filename: "list.html",
      chunks: ["list"],
    }),
    new MiNiCssExtractPlugin({
      filename: "css/[name]-[contenthash:6].css",
    }),
    new CleanWebpackPlugin({
      // 排除目录 不做清理
      // cleanOnceBeforeBuildPatterns
      // "*" 不可忽略的 意思是通配所以目录和文件
      // "*/" 通配所有目录
      // ！意思是排除
      // cleanOnceBeforeBuildPatterns: ["*", "!css"],
    }),
  ],
};
