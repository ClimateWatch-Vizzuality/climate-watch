// Note: You must restart bin/webpack-dev-server for changes to take effect

/* eslint global-require: 0 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const sharedConfig = require('./shared.js');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');

module.exports = merge(sharedConfig, {
  output: { filename: '[name]-[chunkhash].js' },
  stats: 'normal',

  plugins: [
    new webpack.EnvironmentPlugin([
      'GOOGLE_ANALYTICS_ID',
      'USER_REPORT_KEY',
      'CW_API',
      'ESP_API',
      'GFW_API'
    ]),

    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,

      compress: {
        warnings: false
      },

      output: {
        comments: false
      }
    }),
    new ImageminWebpWebpackPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|json|ico|svg|eot|otf|ttf)$/
    })
  ]
});
