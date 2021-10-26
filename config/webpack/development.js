// Note: You must restart bin/webpack-dev-server for changes to take effect
const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv').config(); // eslint-disable-line
const merge = require('webpack-merge');
const sharedConfig = require('./shared.js');
const { env, settings, output } = require('./configuration.js');

module.exports = merge(sharedConfig, {
  devtool: '#eval-source-map',

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

  plugins: [
    new webpack.DefinePlugin({
      'process.env.USER_REPORT_KEY': JSON.stringify(env.USER_REPORT_KEY_STAGING)
    })
  ],

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
    watchOptions: {
      ignored: /node_modules([\\]+|\/)+(?!cw-components)/
    }
  }
});
