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
  target: 'web',
  cache: true,
  resolve: {
    symlinks: false,
    extensions: ['.jsx', '.js'],
    alias: {
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom')
    },
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules')
    ]
  },

  stats: {
    errorDetails: true
  },

  output: {
    pathinfo: true
  },

  plugins: [],

  devServer: {
    compress: true,
    port: settings.dev_server.port,
    https: settings.dev_server.https,
    host: settings.dev_server.host,
    static: {
      directory: output.path,
      publicPath: output.publicPath,
      watch: {
        ignored: /node_modules([\\]+|\/)+(?!cw-components)/,
        usePolling: true
      }
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: true
  }
});
