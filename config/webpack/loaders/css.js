const ExtractTextPlugin = require('extract-text-webpack-plugin'); // eslint-disable-line
const { env } = require('../configuration.js'); // eslint-disable-line

module.exports = {
  test: /\.(css)$/i,
  use: [{ loader: 'style-loader' }, { loader: 'raw-loader' }],
  include: /node_modules/
};
