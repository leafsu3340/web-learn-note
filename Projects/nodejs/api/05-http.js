/*
 * @Description:
 * @Author: dengxiaodong
 * @Date: 2021-04-22 14:32:43
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-04-22 14:40:11
 */
const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    const { headers, url, method } = req;
    if (url === "/" && method === "GET") {
      fs.readFile("./index.html", (err, data) => {
        // if (err) throw err;
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      });
    } else if (url === "/users" && method === "GET") {
      // Ajax服务
      response.writeHead(200, {
        "Content-Type": "application/json",
      });
      response.end(
        JSON.stringify({
          name: "dongdong",
        })
      );
    } else if (method === "GET" && headers.accept.indexOf("image/*") !== -1) {
      fs.createReadStream("./" + url).pipe(res);   // response 本身就是一个流
    }
  })
  .listen(3000);
