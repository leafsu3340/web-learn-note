/*
 * @Description:
 * @Author: dengxiaodong
 * @Date: 2021-05-06 11:53:51
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-05-06 11:55:53
 */
const EventEmitter = require("events").EventEmitter;
const event = new EventEmitter();
event.on("some_event", (num) => {
  console.log(num);
});

let num = 0;
setInterval(() => {
  event.emit("some_event", num++);
}, 1000);
