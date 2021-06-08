const webpack = require("./lib/webpack.js");
const options = require("./webpack.config.js");

new webpack(options).run();
