const webpack = require("./lib/webpack.js")
const options = require("./webpack.config")

new webpack(options).run()