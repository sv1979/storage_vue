module.exports = {
  lintOnSave: true,
  configureWebpack: {
    output: {
       path: __dirname + "/docs",
       publicPath: '/docs/'
    }
  }
};