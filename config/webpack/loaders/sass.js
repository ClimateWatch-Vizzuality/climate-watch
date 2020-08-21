const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { resolve } = require('path');
const { env, settings } = require('../configuration');

const sourceMap = env.NODE_ENV === 'development';

const sassConfig = [
  {
    loader: 'css-loader',
    query: {
      modules: true,
      localIdentName: '[name]__[local]__[hash:base64:5]'
    }
  },
  {
    loader: 'postcss-loader',
    options: { sourceMap }
  },
  {
    loader: `sass-loader?includePaths[]='${resolve(
      settings.source_path,
      'app'
    )}'`,
    options: { sourceMap }
  }
];

const devConfig = [{ loader: 'style-loader' }, ...sassConfig];

const prodConfig = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [...sassConfig]
});

module.exports = {
  test: /\.(scss|sass)$/i,
  use: env.NODE_ENV === 'production' ? prodConfig : devConfig,
  exclude: /node_modules/
};
