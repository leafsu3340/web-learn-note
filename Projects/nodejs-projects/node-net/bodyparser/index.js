/*
 * @Description: bodyParser 简易原理
 * @Author: dengxiaodong
 * @Date: 2021-04-27 11:58:09
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-04-27 14:35:58
 */

const Koa = require("koa");
const app = new Koa();

// const bodyParser = require('koa-bodyparser')
// app.use(bodyParser())

app.use(require("koa-static")(__dirname + "/"));

// TAG bodyParser中间件实现
app.use(async (ctx, next) => {
  console.log("bodyparser----------");
  const req = ctx.request.req;
  let size = 0;
  const reqData = [];
  await new Promise((resolve, reject) => {
    req.on("data", (data) => { // req传的body data为二进制流，即Buffer
      reqData.push(data);
      size += data.length;
    });
    req.on("end", function () {
      const data = Buffer.concat(reqData, size);
      ctx.request.body = data.toString(); // 转换Buffer，举例转换为字符串
      resolve();
    });
  });
  await next();
});

const router = require("koa-router")();
router.post("/add", async (ctx, next) => {
  console.log("body", ctx.request.body);
  ctx.body = ctx.request.body;
  next();
});

app.use(router.routes());

app.listen(3000);
