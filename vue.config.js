const webpack = require('webpack')
module.exports = {
  assetsDir: 'static',
  parallel: false,
  publicPath: './',
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://192.168.101.40:19090',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    },
    overlay: {
      warnings: false,
      errors: false
    }
  },
  lintOnSave: false,
  productionSourceMap: false,
  // lintOnSave:false,
  chainWebpack: (config) => {
    config.plugins.delete('prefetch') /* 预加载处理 */
  }
}
