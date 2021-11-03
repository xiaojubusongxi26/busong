const webpack = require('webpack')
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://music.163.com/song/media',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
    }
  },
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.plugins.delete('prefetch') /* 预加载处理 */
  }
}
