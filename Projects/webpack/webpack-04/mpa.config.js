const path = require("path");
const MiNiCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const glob = require("glob");

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));

  entryFiles.map((item, index) => {
    const entryFile = entryFiles[index];
    const match = entryFile.match(/src\/(.*)\/index\.js$/);
    const pageName = match[1];
    entry[pageName] = entryFile;
    htmlWebpackPlugins.push(
      new htmlWebpackPlugin({
        template: `./src/${pageName}/index.html`,
        filename: `${pageName}.html`,
        chunks: [pageName],
      })
    );
  });
  return {
    entry,
    htmlWebpackPlugins,
  };
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  output: {
    filename: "js/[name].js?[hash:6]",
    path: path.resolve(__dirname, "./mpa"),
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
    ...htmlWebpackPlugins,
    new MiNiCssExtractPlugin({
      filename: "css/[name]-[contenthash:6].css",
    }),
    new CleanWebpackPlugin({}),
  ],
};
