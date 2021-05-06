const http = require("http");
const session = {}; // 全局变量用来存映射信息
http
  .createServer((req, res) => {
    const sessionkey = "sid";

    if (req.url === "/favicon.ico") {
      return;
    } else {
      const cookie = req.headers.cookie;
      if (cookie && cookie.indexOf(sessionkey) > -1) {
        res.end("come back");
        console.log("cookie", cookie);
        const pattern = new RegExp(`${sessionkey}=([^;]+);?\s*`);
        const sid = pattern.exec(cookie)[1];
        console.log("session:", sid, session, session[sid]);
      } else {
        const sid = (Math.random() * 999999).toFixed();
        res.setHeader("Set-cookie", `${sessionkey}=${sid}`);
        session[sid] = { name: "laowang" };
        res.end("hello cookie");
      }
    }
  })
  .listen(3000);
