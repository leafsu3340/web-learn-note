const path = require("path");
const MiNiCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "[name].js",
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
      // {
      //   test: /\.less$/,
      //   use: [
      //     MiNiCssExtractPlugin.loader,
      //     "css-loader",
      //     // {
      //     //   loader: "css-loader",
      //     //   options: {},
      //     // },
      //     "postcss-loader",
      //     "less-loader",
      //   ],
      // },
      {
        test: /\.less$/,
        use: ["kkb-style-loader", "kkb-css-loader", "kkb-less-loader"],
      },
      // {
      //   test: /\.js$/,
      //   use: [
      //     // path.resolve(__dirname, "./myLoaders/replace-loader.js"),
      //     "replace-loader",
      //     {
      //       // loader: path.resolve(
      //       //   __dirname,
      //       //   "./myLoaders/replace-loader-async.js"
      //       // ),
      //       loader: "replace-loader-async",
      //       options: {
      //         name: "kkb",
      //       },
      //       // hello kkb
      //     },
      //   ],
      // },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
    // 样式抽离成独立的文件
    // 文件名称
    new MiNiCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
};
