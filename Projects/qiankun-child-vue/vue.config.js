module.exports = {
  lintOnSave: false,
  devServer: {
    port: 9000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    output: {
      library: `qiankun-vue-app`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_qiankun-vue-app`,
    },
  },
};
