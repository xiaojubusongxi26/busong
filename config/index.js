module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/a': {
        target: 'http://localhost:1212',
        changeOrigin: true,
        pathRewrite: {
          '/a': ''
        }
      }
    }
  }
}
