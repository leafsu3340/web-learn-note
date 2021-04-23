const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");

class KKB {
  constructor() {
    this.middlewares = [];
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  listen(...args) {
    const server = http.createServer(async (req, res) => {
      const ctx = this.createContext(req, res);
      const fn = this.compose(this.middlewares);
      await fn(ctx);
      // console.log(ctx.body, ctx.method, ctx.url)
      // this.callback(req,res)
      // this.callback(ctx)
      res.end(ctx.body);
    });
    server.listen(...args);
  }

  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);
    // 挂到ctx上，
    ctx.request.req = req;
    ctx.response.res = res;
    return ctx;
  }

  // 组合函数  俄罗斯套娃  洋葱模型  [递归实现]
  compose(middlewares) {
    return function (ctx) {
      return dispatch(0);
      function dispatch(i) {
        const fn = middlewares[i];
        if (!fn) {
          // 递归终止条件
          return Promise.resolve();
        }
        return Promise.resolve(
          fn(ctx, function next() {
            return dispatch(i + 1);
          })
        );
      }
    };
  }
}

module.exports = KKB;
