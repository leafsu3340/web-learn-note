/*
 * @Description: 文件系统数据库
 * @Author: dengxiaodong
 * @Date: 2021-05-06 10:28:21
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-05-06 10:39:34
 */

const fs = require("fs");

// read
function get(key) {
  fs.readFile("./db.json", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.parse(data)[key]);
    }
  });
}

// write
function set(key, value) {
  fs.readFile("./db.json", (err, data) => {
    const json = data ? JSON.parse(data) : {};
    json[key] = value; // 设置值
    // 重新写入文件
    fs.writeFile("./db.json", JSON.stringify(json), (err) => {
      if (err) {
        console.log(err);
      }
      console.log("写入成功！");
    });
  });
}

// 命令行接口部分
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", function (input) {
  const [op, key, value] = input.split(" ");
  if (op === "get") {
    get(key);
  } else if (op === "set") {
    set(key, value);
  } else if (op === "quit") {
    rl.close();
  } else {
    console.log("没有该操作");
  }
});

rl.on("close", function () {
  console.log("程序结束");
  process.exit(0); // 结束进程
});
