// http.js
const http = require("http");
const fs = require("fs");

const app = http.createServer((req, res) => {
  const { method, url } = req;
  if (method == "GET" && url == "/") {
    fs.readFile("./index.html", (err, data) => {
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  } else if (method == "OPTIONS" && url == "/api/users") {
    res.writeHead(200, {
      // TAG 复杂请求，跨域时需要预检
      "Access-Control-Allow-Origin": "http://localhost:4000",
      "Access-Control-Allow-Headers": "X-Token,Content-Type",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Credentials": "true", // TAG 请求中withCredentials=true，涉及的处理需设置'Access-Control-Allow-Credentials'
    });
    res.end();
  } else if (method == "OPTIONS" && url == "/api/save") {
    res.writeHead(200, {
      // TAG 复杂请求，跨域时需要预检
      "Access-Control-Allow-Origin": "http://localhost:4000",
      "Access-Control-Allow-Headers": "X-Token,Content-Type",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Credentials": "true", // TAG 请求中withCredentials=true，涉及的处理需设置'Access-Control-Allow-Credentials'
    });
    res.end();
  } else if (method == "GET" && url == "/api/users") {
    console.log("/api/users  cookie", req.headers.cookie); // TAG credential请求,服务才能获得cookie
    // res.setHeader("Content-Type", "application/json");
    res.setHeader("Set-Cookie", "cookie1=va333;");

    // TAG 响应简单请求: 动词为get/post/head，没有自定义请求头
    // ! Content-Type是application/x-wwwform-urlencoded，multipart/form-data或text/plain之一，通过添加以下响应头解决
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4000"); // TAG Access-Control-Allow-Origin:value为当前域的host，标明该请求允许跨域跨域
    // res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader("Access-Control-Allow-Credentials", "true"); // TAG 请求中withCredentials=true，涉及的处理需设置'Access-Control-Allow-Credentials'
    res.end(JSON.stringify([{ name: "tom", age: 20 }]));
  } else if (method === "POST" && url === "/api/save") {
    console.log("/api/save  cookie", req.headers.cookie); // TAG credential请求,服务才能获得cookie
    let reqData = [];
    let size = 0;
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    req.on("data", (data) => {
      // console.log(">>>req on", data);
      reqData.push(data);
      size += data.length;
    });
    req.on("end", function () {
      // console.log("end");
      const data = Buffer.concat(reqData, size);
      // console.log("data:", size, data.toString());
      res.end(`formdata:${data.toString()}`);
    });
  } else if (method === "POST" && url === "/api/saveform") {
    let reqData = [];
    let size = 0;
    const fis = fs.createWriteStream("./test2.json");  // TAG 创建文件流形式写文件，适合读写大文件
    req.on("data", (data) => {
      reqData.push(data);
      size += data.length;
      fis.write(data);
    });
    req.on("end", function () {
      const data = Buffer.concat(reqData, size);  // TAG 先拼接Buffer数据，在读写文件，适合数据量比较小的场景
      fis.end();
      fs.writeFileSync("./test.json", data);
      res.end(`formdata:${data.toString()}`);
    });
  }
});
module.exports = app;
