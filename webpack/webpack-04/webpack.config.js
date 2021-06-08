const path = require("path");
const MiNiCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const txtwebpackplugin = require("./myPlugins/txt-webpack-plugin.js");

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "js/[name]-[hash:6].js",
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
      {
        test: /\.js$/,
        use: "babel-loader",
      },
    ],
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    open: true,
    port: 8081,
    proxy: {
      "/api": {
        target: "http://localhost:9092",
      },
    },
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),

    new MiNiCssExtractPlugin({
      filename: "css/[name]-[contenthash:6].css",
    }),
    new txtwebpackplugin({ name: "kkb" }),
    new CleanWebpackPlugin(),
  ],
};
