const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { env } = require('../configuration.js');

const devConfig = [
  { loader: 'style-loader' },
  {
    loader: 'css-loader',
    query: {
      modules: true,
      localIdentName: '[name]__[local]__[hash:base64:5]'
    }
  },
  { loader: 'postcss-loader' },
  { loader: 'sass-loader' }
];

const prodConfig = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [
    { loader: 'css-loader', options: { minimize: env.NODE_ENV === 'production' } },
    { loader: 'postcss-loader', options: { sourceMap: true } },
    'resolve-url-loader',
    { loader: 'sass-loader', options: { sourceMap: true } }
  ]
});

module.exports = {
  test: /\.(scss|sass|css)$/i,
  use: env.NODE_ENV === 'production' ? prodConfig : devConfig,
  exclude: /node_modules/
};
