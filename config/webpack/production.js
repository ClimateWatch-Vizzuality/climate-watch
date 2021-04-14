// Note: You must restart bin/webpack-dev-server for changes to take effect

/* eslint global-require: 0 */

const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CompressionPlugin = require('compression-webpack-plugin');
const sharedConfig = require('./shared.js');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');

module.exports = merge(sharedConfig, {
  mode: 'production',
  output: { filename: '[name]-[chunkhash].js' },
  stats: 'normal',
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'GOOGLE_ANALYTICS_ID',
      'USER_REPORT_KEY',
      'CW_API',
      'ESP_API',
      'GFW_API'
    ]),
    new ImageminWebpWebpackPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|json|ico|svg|eot|otf|ttf)$/,
      deleteOriginalAssets: 'keep-source-map'
    })
  ]
});
