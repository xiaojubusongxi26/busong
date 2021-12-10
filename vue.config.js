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
        target: 'http://192.168.3.30:9421',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  productionSourceMap: false,
  // lintOnSave:false,
  chainWebpack: (config) => {
    config.plugins.delete('prefetch') /* 预加载处理 */
  }
}
