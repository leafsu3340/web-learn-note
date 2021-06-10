# 总结

### webpack  就是个开发工具，更多的是工具属性

### webpack的几个重要属性：
1.entry   入口  本质是个对象  chunks
2.output:{fileName:'xxx', path:'xxx'}  出口  打包后输出的文件路径，多个输出路径，可以利用占位符
3.module:{rule: /\.css/, use: {loader:['xxx'], options: {...}}}  loader执行顺序自右向左   outputPath与publicPath
4.plugins  插件、数组   htmlWebpackPlugin、MiniExtractCssPlugin、CleanWebpackPlugin、happyPack
5.resolveLoader:{module：[]}

### 打包后的js文件， 里面就是一个自执行函数
- webpack-bootstrap
- exports、require...   哪里不够补哪里
- eval(chunks)

### loader
- 本质就是一个有返回字符串的函数
module.exports = function(source) {... => return ``}
- webpack默认支持js、json文件

### 配置文件
webpack.config.js
.browserslistrc
.npmrc
.babelrc
postcss.config.js

### webpack插件
Tapable是webpack的核心工具，类似于插件接口
对外暴露  tap，tapAsync,和tapPromise  => 将要执行的操作绑定注入到webpack中，webpack执行钩子是自动执行绑定的操作。
- 异步钩子  tapAsync
- 同步钩子  tag
```
class TxtWebpackPlugin {
  constructor(options) {
    // console.log(options);
  }
  apply(compiler) {   // webpack自动调用该函数
    //  异步钩子 tapAsync
    //  同步钩子 tap
    compiler.hooks.compile.tap("xxx", (compilation) => {
      console.log(compilation);
    });
    compiler.hooks.emit.tapAsync("TxtWebpackPlugin", (compilation, cb) => {
      compilation.assets["kkb.txt"] = {
        source: function () {
          return "hello kkb txt";
        },
        size: function () {
          return 1;
        },
      };
      cb();  // cb必须得执行，不然webpack将会阻塞在此处
    }); // 钩子的api
  }
}
module.exports = TxtWebpackPlugin;
```

### webpack编译原理


