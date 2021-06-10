/*
 * @Description:
 * @Author: dengxiaodong
 * @Date: 2021-06-09 21:38:12
 * @LastEditors: dengxiaodong
 * @LastEditTime: 2021-06-09 21:40:55
 */
module.exports = function (source) {
  return `
    const tag = document.createElement("style");
    tag.innerHTML = ${source};
    document.head.appendChild(tag);
  `;
};
