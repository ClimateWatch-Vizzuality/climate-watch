const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { resolve } = require('path');
const { env, settings } = require('../configuration');

const devConfig = [
  { loader: 'style-loader' },
  {
    loader: 'css-loader',
    query: {
      modules: true,
      localIdentName: '[name]__[local]__[hash:base64:5]'
    }
  },
  { loader: 'postcss-loader', options: { sourceMap: true } },
  {
    loader: `sass-loader?includePaths[]='${resolve(
      settings.source_path,
      'app'
    )}'`,
    options: { sourceMap: true }
  }
];

const prodConfig = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [
    {
      loader: 'css-loader',
      options: { minimize: env.NODE_ENV === 'production' }
    },
    { loader: 'postcss-loader' },
    'resolve-url-loader',
    { loader: 'sass-loader' }
  ]
});

module.exports = {
  test: /\.(scss|sass)$/i,
  use: env.NODE_ENV === 'production' ? prodConfig : devConfig,
  exclude: /node_modules/
};
