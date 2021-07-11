const path = require("path");
// const MiNiCssExtractPlugin = require("mini-css-extract-plugin");
// const htmlwebpackplugin = require("html-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const purifycss = require("purifycss-webpack"); // treeshaking css
// const txtwebpackplugin = require("./myPlugins/txt-webpack-plugin.js");
// const glob = require("glob-all");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.config")

const devConfig = {
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dev"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less/,
        use: [
          // MiNiCssExtractPlugin.loader,
          "style-loader",
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      // {
      //   test: /\.less$/,
      //   use: ["kkb-style-loader", "kkb-css-loader", "kkb-less-loader"],
      // },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images",
            publicPath: "../images/",
            limit: 3 * 1024,
          },
        },
      },
      // {
      //   test: /\.jsx$/,
      //   use: "babel-loader",
      // },
      // {
      //   test: /\.vue/,
      //   use: ["vue-loader"],
      // },
    ],
  },
  optimization: {
    usedExports: true, // treeshaking js
  },
  devtool: "eval-source-map",
  plugins: [
    // new CleanWebpackPlugin(),
    // new txtwebpackplugin({
    //   name: 'kkb'
    // })
  ],
};

module.exports = merge(baseConfig, devConfig)