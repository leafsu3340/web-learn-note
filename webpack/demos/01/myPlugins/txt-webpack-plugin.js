class TxtWebpackPlugin {
  constructor(options){
    console.log(options);
  }

  apply(compiler) {
    // 异步钩子  tapAsync
    // 同步钩子  tag
    compiler.hooks.compile.tap('XXX', (compilation) => {
      console.log(compilation);
    });
    compiler.hooks.emit.tapAsync("TxtWebpackPlugin", (compilation, cb) => {
      compilation.assets["kkb.txt"] = {
        source: function () {
          return "hello kkb txt12321";
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