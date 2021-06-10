const path = require("path");
const htmlwebpackplugin = require("html-webpack-plugin");
const MiNiCssExtractPlugin = require("mini-css-extract-plugin");

const txtwebpackplugin = require("./myPlugins/txt-webpack-plugin.js");

module.exports = {
  entry: {
    index: "./src/index.js",
    test: "./src/test.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
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
      //   test: /\.less/,
      //   use: [
      //     MiNiCssExtractPlugin.loader,
      //     "css-loader",
      //     "postcss-loader",
      //     "less-loader",
      //   ],
      // },
      {
        test: /\.less$/,
        use: ["kkb-style-loader", "kkb-css-loader", "kkb-less-loader"],
      },
      {
        test: /\.js$/,
        use: [
          // "replace-loader",
          {
            loader: "replace-loader-async",
            options: {
              name: "kkb",
            },
          },
        ],
      },
      // {
      //   test: /\.vue/,
      //   use: ["vue-loader"],
      // },
    ],
  },
  plugins: [
    new htmlwebpackplugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new htmlwebpackplugin({
      template: "./src/index.html",
      filename: "test.html",
      chunks: ["test"],
    }),
    new MiNiCssExtractPlugin({
      filename: "[name].css",
    }),
    new txtwebpackplugin({
      name: 'kkb'
    })
  ],
};
