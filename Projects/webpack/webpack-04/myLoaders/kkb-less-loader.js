// 语法转换 less to css

const less = require("less");

module.exports = function (source) {
  less.render(source, (error, output) => {
    this.callback(error, output.css);
  });
};
