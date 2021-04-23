// static.js
const fs = require("fs");
const path = require("path");

module.exports = (dirPath = "./public") => {
  return async (ctx, next) => {
    if (ctx.url.indexOf("/public") === 0) {
      // public开头 读取文件
      const url = path.resolve(__dirname, dirPath);
      const fileBaseName = path.basename(url);
      const filepath = url + ctx.url.replace("/public", "");
      console.log(filepath);
      console.log(ctx.url, url, filepath, fileBaseName);
      try {
        stats = fs.statSync(filepath); // 获取文件状态 ？ 文件夹 or 文件
        if (stats.isDirectory()) {
          // 如果是文件夹，则返回文件链接列表
          const dir = fs.readdirSync(filepath); // 文件列表
          // const
          const ret = ['<div style="padding-left:20px">'];
          dir.forEach((filename) => {
            console.log(filename);
            // 简单认为不带小数点的格式，就是文件夹，实际应该用statSync
            if (filename.indexOf(".") > -1) {
              ret.push(
                `<p><a style="color:black" href="${ctx.url}/${filename}">${filename}</a></p>`
              );
            } else {
              // 文件
              ret.push(
                `<p><a href="${ctx.url}/${filename}">${filename}</a></p>`
              );
            }
          });
          ret.push("</div>");
          ctx.body = ret.join("");
        } else {
          console.log("文件");
          const content = fs.readFileSync(filepath); // 读取文件字符
          console.log("content type -------", content instanceof Buffer); // TAG 文件读取是二进制，content类型是Buffer
          ctx.body = content;
        }
      } catch (e) {
        // 报错了 文件不存在
        ctx.body = "404, not found";
      }
    } else {
      // 否则不是静态资源，直接去下一个中间件
      await next();
    }
  };
};
