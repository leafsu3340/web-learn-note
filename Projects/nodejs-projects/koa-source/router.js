class Router {
  constructor() {
    this.stack = [];
  }
  register(path, methods, middleware) {
    let route = { path, methods, middleware };
    this.stack.push(route);
  }
  // 现在只支持get和post，其他的同理
  get(path, middleware) {
    this.register(path, "get", middleware);
  }
  post(path, middleware) {
    this.register(path, "post", middleware);
  }
  routes() {
    console.log('routes');
    let stock = this.stack;
    return async function (ctx, next) {
      const currentPath = ctx.url;
      console.log(currentPath);
      let route;
      for (let i = 0; i < stock.length; i++) {
        let item = stock[i];
        if (
          currentPath === item.path &&
          item.methods.indexOf(ctx.method) >= 0
        ) {
          // 判断path和method
          route = item.middleware;
          break;
        }
      }
      console.log(route);
      if (typeof route === "function") {
        route(ctx, next);
        return; // 不执行 next 函数，则中间件的执行在此终止
      }
      await next();
      console.log('after no route --------------');
    };
  }
}

module.exports = Router;
