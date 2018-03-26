module.exports = {
  lintOnSave: true,
  configureWebpack: {
    output: {
       path: __dirname + "/gh-pages"
    }
  }
};