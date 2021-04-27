const http = require("http");
const fs = require("fs");
const path = require("path");

const app = http.createServer((request, response) => {
  const { pathname } = require("url").parse(request.url);
  console.log("pathname----url-------", pathname, request.url);

  if (pathname === "/upload") {
    const filename = request.headers["file-name"] || "abc.png";
    const outFilePath = path.resolve(__dirname, filename);
    const fis = fs.createWriteStream(outFilePath);
    request.pipe(fis); // TAG pipe()操作接收的文件流与写文件流进行对接
    response.end();
  } else {
    const filename = pathname === "/" ? "index.html" : pathname.substring(1);
    var type = (function (_type) {
      switch (
        _type // 扩展名
      ) {
        case "html":
        case "htm":
          return "text/html charset=UTF-8";
        case "js":
          return "application/javascript charset=UTF-8";
        case "css":
          return "text/css charset=UTF-8";
        case "txt":
          return "text/plain charset=UTF-8";
        case "manifest":
          return "text/cache-manifest charset=UTF-8";
        default:
          return "application/octet-stream";
      }
    })(filename.substring(filename.lastIndexOf(".") + 1));
    // 异步读取文件,并将内容作为单独的数据块传回给回调函数
    // 对于确实很大的文件,使用API: fs.createReadStream()更好
    fs.readFile(filename, (err, content) => {
      if (err) {
        response.writeHead(404, { "Content-type": "text/plain charset=UTF-8" });
        response.write(err.message);
      } else {
        response.writeHead(200, { "Content-type": type });
        response.write(content); // 把文件内容作为响应主体
      }
      response.end();
    });
  }
});

app.listen(3000);
