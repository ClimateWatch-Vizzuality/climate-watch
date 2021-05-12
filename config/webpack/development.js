// Note: You must restart bin/webpack-dev-server for changes to take effect
const path = require('path');
const merge = require('webpack-merge');
const sharedConfig = require('./shared.js');
const { settings, output } = require('./configuration.js');

module.exports = merge(sharedConfig, {
  mode: 'development',
  devtool: 'cheap-source-map',
  optimization: {
    // runtimeChunk: true,
    // removeAvailableModules: false,
    // removeEmptyChunks: false,
    // splitChunks: false
  },
  cache: true,
  resolve: {
    symlinks: false,
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom')
    }
  },

  stats: {
    errorDetails: true
  },

  output: {
    pathinfo: true
  },

  plugins: [],

  devServer: {
    contentBase: output.path,
    compress: true,
    port: settings.dev_server.port,
    clientLogLevel: 'none',
    https: settings.dev_server.https,
    host: settings.dev_server.host,
    publicPath: output.publicPath,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules([\\]+|\/)+(?!cw-components)/,
      poll: 1000
    }
  }
});
