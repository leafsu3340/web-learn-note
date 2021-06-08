// loader的结构 : 不能是箭头函数
// 通过source接受模块内容
// loader必须有返回值
// loader是可以接收参数的，配置
// 如何返回多个信息
// 如何处理异步逻辑
// 多个loader的使用，需要注意顺序
module.exports = function (source) {
  //   console.log();
  //   return source.replace("webpack", this.query.name);
  //   const result = source.replace("webpack", this.query.name);
  //   this.callback(null, result);
  const callback = this.async();
  setTimeout(() => {
    const result = source.replace("webpack", this.query.name);
    callback(null, result);
  }, 3000);
};
