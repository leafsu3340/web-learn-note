// 创建style
// css内容放入style
// style标签放入html的head头部

module.exports = function (source) {
  return `
    const tag = document.createElement("style");
    tag.innerHTML = ${source};
    document.head.appendChild(tag);
  `;
};
