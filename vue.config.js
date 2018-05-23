module.exports = {
  lintOnSave: true,
    devServer: {
      port: 8088
    },
  configureWebpack: {
    output: {
       path: __dirname + "/docs",
       // publicPath: '/storage_vue/' Comment it out before production build
    }
  }
};