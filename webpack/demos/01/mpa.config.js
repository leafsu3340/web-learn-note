const path = require("path");
const MiNiCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require("glob");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const setMPA = () => {
  const entry = {};
  const HtmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));

  entryFiles.map((item, index) => {
    const entryFile = item;
    const match = entryFile.match(/src\/(.*)\/index\.js$/);
    const pageName = match[1];
    entry[pageName] = entryFile;

    HtmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        template: `./src/${pageName}/index.html`,
        filename: `${pageName}.html`,
        chunks: [pageName],
      })
    );
  });
  return {
    entry,
    HtmlWebpackPlugins,
  };
};

const { entry, HtmlWebpackPlugins } = setMPA();

module.exports = {
  entry,
  // entry: {
  //   index: "./src/index.js",
  //   test: "./src/test.js",
  // },
  output: {
    filename: "js/[name].js?[hash:6]",
    path: path.resolve(__dirname, "./mpa"),
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
        test: /\.less/,
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
            name: "[name].[ext]",
            outputPath: "images",
            publicPath: "../images",
            limit: 3 * 1024,
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
      // {
      //   test: /\.vue/,
      //   use: ["vue-loader"],
      // },
    ],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: "./src/index.html",
    //   filename: "index.html",
    //   chunks: ["index"],
    // }),
    // new HtmlWebpackPlugin({
    //   template: "./src/index.html",
    //   filename: "test.html",
    //   chunks: ["test"],
    // }),
    ...HtmlWebpackPlugins,
    new MiNiCssExtractPlugin({
      filename: "css/[name]-[contenthash:6].css",
    }),
    new CleanWebpackPlugin(),
  ],
};
