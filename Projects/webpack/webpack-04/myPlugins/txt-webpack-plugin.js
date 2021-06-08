// 插件的格式

class TxtWebpackPlugin {
  constructor(options) {
    // console.log(options);
  }

  apply(compiler) {
    //   异步钩子 tapAsync
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

      cb();
    }); //钩子的api
  }
}

module.exports = TxtWebpackPlugin;
