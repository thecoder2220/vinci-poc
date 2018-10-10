/* eslint-disable */

var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.config')

var hostname = config.devServer.hostname
var port = config.devServer.port

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  historyApiFallback: true,
  host: '0.0.0.0',
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
}).listen(port, hostname, function (err, result) {
  if (err) {
    return console.log(err)
  }

  console.log(`Listening at http://${hostname}:${port}/`)
})





