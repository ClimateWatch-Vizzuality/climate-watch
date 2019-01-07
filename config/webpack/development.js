// Note: You must restart bin/webpack-dev-server for changes to take effect

// eslint-disable-next-line
const dotenv = require('dotenv').config();
const merge = require('webpack-merge');
const sharedConfig = require('./shared.js');
const { settings, output } = require('./configuration.js');

module.exports = merge(sharedConfig, {
  devtool: '#eval-source-map',
  mode: 'development',
  stats: { errorDetails: true },
  output: { pathinfo: true },
  devServer: {
    clientLogLevel: 'none',
    https: settings.dev_server.https,
    host: settings.dev_server.host,
    port: settings.dev_server.port,
    contentBase: output.path,
    publicPath: output.publicPath,
    compress: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    watchOptions: { ignored: /node_modules/ }
  }
});
