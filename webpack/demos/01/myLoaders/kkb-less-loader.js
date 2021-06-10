/*
 * @Description:
 * @Author: dengxiaodong
 * @Date: 2021-06-09 21:38:24
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-06-09 21:51:36
 */
const less = require("less");

module.exports = function (source) {
  less.render(source, (err, output) => {
    this.callback(err, output.css);
  });
};
