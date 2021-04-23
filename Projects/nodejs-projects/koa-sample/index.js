const Koa = require("koa");
const app = new Koa();

// const delay = () =>
//   Promise.resolve((resolve) => setTimeout(() => resolve(), 2000));
// app.use(async (ctx, next) => {
//   ctx.body = "1";
//   setTimeout(() => {
//     ctx.body += "2";
//   }, 2000);
//   await next();
//   ctx.body += "3";
// });

// app.use(async (ctx, next) => {
//   ctx.body += "4";
//   await delay();
//   await next();
//   ctx.body += "5";
// });

// app.use(async (ctx, next) => {
//   ctx.body += "6";
// });
app.use(async (ctx, next) => {
  const start = new Date().getTime() + 1000;
  console.log('延时1s开始');
  while(new Date().getTime() < start) { // 阻塞写法
  }
  console.log('延时1s结束');
  await next();
  const end = new Date().getTime();
  console.log(`耗费时间：${end - start} ms`);
});

// 静态资源托管
app.use(require("koa-static")(__dirname + "/"));

// 路由的使用
const router = require("koa-router")();
router.get("/string", (ctx, next) => {
  ctx.body = "koa2 string";
});
router.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json",
  };
});
app.use(router.routes());
// 启动服务
app.listen(3000);
