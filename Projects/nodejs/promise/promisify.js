module.exports = function promisify(fn) {
  return function (...args) {
    // 传参进来，返回函数
    return new Promise(function (resolve, reject) {
      args.push(function (err, ...arg) {
        // 参数后添加回调函数，重写回调函数，err优先返回处理原则
        if (err) {
          reject(err);
        } else {
          resolve(...arg);
        }
      });
      fn.apply(null, args); // 调用包装的异步函数,立马执行一次，使之跟调用fn无异
    });
  };
};

