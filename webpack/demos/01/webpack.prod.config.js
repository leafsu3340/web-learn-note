const path = require("path");
const MiNiCssExtractPlugin = require("mini-css-extract-plugin");
// const htmlwebpackplugin = require("html-webpack-plugin");
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const purifycss = require("purifycss-webpack"); // treeshaking css
// const txtwebpackplugin = require("./myPlugins/txt-webpack-plugin.js");
const glob = require("glob-all");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.config");
const TerserPlugin = require('terser-webpack-plugin');
// speed-measure-webpack-plugin:可以测量各个插件和loader 所花费的时间
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

// webpack-bundle-analyzer:分析webpack打包后的模块依赖关系：
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const prodConfig = {
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiNiCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.less/,
        use: [
          MiNiCssExtractPlugin.loader,
          "css-loader",
          // "postcss-loader",
          "less-loader",
        ],
      },
      // {
      //   test: /\.less$/,
      //   use: ["kkb-style-loader", "kkb-css-loader", "kkb-less-loader"],
      // },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images",
              // publicPath: "../images/",
              limit: 3 * 1024,
            },
          },
          // {
          //   loader: "image-webpack-loader",
          //   options: {},
          // },
        ],
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
  devtool: "inline-source-map",
  optimization: {
    usedExports: true, // treeshaking - js ，如果css被摇下去了使用 ： package.json中设置"sideEffects": ["*.less", "*.css"]设置白名单
    concatenateModules: true,
    minimizer: [
      new TerserPlugin({
        // 使⽤ cache，加快⼆次构建速度
        cache: true,
        parallel: true, // 多线程
        terserOptions: {
          comments: false,
          compress: {
            // 删除⽆⽤的代码
            unused: true,
            // 删掉 debugger
            drop_debugger: true, // eslint-disable-line
            // 移除 console
            drop_console: true, // eslint-disable-line
            // 移除⽆⽤的代码
            dead_code: true // eslint-disable-line
          }
        }
      })
    ],
    splitChunks: {
      chunks: 'async',//对同步 initial，异步 async，所有的模块有效 all
      minSize: 30000,//最⼩尺⼨，当模块⼤于30kb
      maxSize: 0,//对模块进⾏⼆次分割时使⽤，不推荐使⽤
      minChunks: 1,//打包⽣成的chunk⽂件最少有⼏个chunk引⽤了这个模块
      maxAsyncRequests: 5,//最⼤异步请求数，默认5
      maxInitialRequests: 3,//最⼤初始化请求书，⼊⼝⽂件同步请求，默认3
      automaticNameDelimiter: '-',//打包分割符号
      name: true,//打包后的名称，除了布尔值，还可以接收⼀个函数function
      cacheGroups: {//缓存组
        vendors: {
          chunks: "initial",
          test: /[\\/]node_modules[\\/]/,
          name: "vendor", // 要缓存的 分隔出来的 chunk 名称
          priority: 10//缓存组优先级 数字越⼤，优先级越⾼
        },
        other: {
          chunks: "initial", // 必须三选⼀： "initial" | "all" | "async"(默认就是async)
          test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk,
          name: "other",
          minSize: 30000,
          minChunks: 1,
          priority: 1//缓存组优先级 数字越⼤，优先级越⾼
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true//可设置是否重⽤该chunk
        }
      }
    }
  },
  plugins: [
    new purifycss({
      paths: glob.sync([
        path.resolve(__dirname, "./src/*.html"),
        path.resolve(__dirname, "./src/*.js"),
      ]),
    }),
    new MiNiCssExtractPlugin({
      filename: "[name].css",
    }),
    // new CleanWebpackPlugin(),
    // new txtwebpackplugin({
    //   name: 'kkb'
    // })
    // new BundleAnalyzerPlugin(),
  ],
};

module.exports = smp.wrap(merge(baseConfig, prodConfig));
