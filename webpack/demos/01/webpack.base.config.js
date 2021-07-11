const path = require("path");
const MiNiCssExtractPlugin = require("mini-css-extract-plugin");
const htmlwebpackplugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const purifycss = require("purifycss-webpack"); // treeshaking css
// const txtwebpackplugin = require("./myPlugins/txt-webpack-plugin.js");
const glob = require("glob-all");
module.exports = {
  entry: {
    index: "./src/index.js",
    test: "./src/test.js",
  },
  // output: {
  //   filename: "[name].js",
  //   path: path.resolve(__dirname, "./dist"),
  // },
  // mode: "development",
  // resolveLoader: {
  //   modules: ["./node_modules", "./myLoaders"],
  // },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: ["style-loader", "css-loader"],
      // },
      // {
      //   test: /\.less/,
      //   use: [
      //     MiNiCssExtractPlugin.loader,
      //     "css-loader",
      //     "postcss-loader",
      //     "less-loader",
      //   ],
      // },
      // {
      //   test: /\.less$/,
      //   use: ["kkb-style-loader", "kkb-css-loader", "kkb-less-loader"],
      // },
      // {
      //   test: /\.js$/,
      //   use: [
      //     // "replace-loader",
      //     {
      //       loader: "replace-loader-async",
      //       options: {
      //         name: "kkb",
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.js$/,
        include: path.resolve('src'),
        use: [
          // 'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            },
          }
          // 'babel-loader'
          // 你的⾼开销的loader放置在此 (e.g babel-loader)
        ]
      },
      // {
      //   test: /\.(png|jpe?g|gif|webp)$/,
      //   use: {
      //     loader: "url-loader",
      //     options: {
      //       name: "[name].[ext]",
      //       outputPath: "images",
      //       publicPath: "../images/",
      //       limit: 3 * 1024,
      //     },
      //   },
      // },
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
        test: /\.jsx$/,
        use: "babel-loader", // 缓存机制，开发阶段开启缓存机制
      },
      // {
      //   test: /\.vue/,
      //   use: ["vue-loader"],
      // },
    ],
  },
  // devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    open: true,
    port: 8081,
    hot: true,
    hotOnly: true, //关闭浏览器的刷新
    proxy: {
      "/api": {
        target: "http://localhost:9092",
      },
    },
  },
  // optimization: {
  //   usedExports: true, // treeshaking js
  // },
  plugins: [
    // new purifycss({
    //   paths: glob.sync([
    //     path.resolve(__dirname, './src/*.html'),
    //     path.resolve(__dirname, './src/*.js')
    //   ])
    // }),
    new htmlwebpackplugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["index"],
      // minify: true
    }),
    new htmlwebpackplugin({
      template: "./src/test.html",
      filename: "test.html",
      chunks: ["test"],
      // minify: true
    }),
    // new MiNiCssExtractPlugin({
    //   filename: "[name].css",
    // }),
    new CleanWebpackPlugin(),
    // new txtwebpackplugin({
    //   name: 'kkb'
    // })
  ],
};
