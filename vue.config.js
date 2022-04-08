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
        target: 'http://localhost:1212',
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
