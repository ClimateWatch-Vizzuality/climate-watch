const { env, publicPath } = require('../configuration.js');

module.exports = {
  test: /\.(jpg|jpeg|png|gif|eot|ttf|woff|woff2)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        publicPath,
        name:
          ['staging', 'production'].indexOf(env.NODE_ENV) > -1 ? '[name]-[hash].[ext]' : '[name].[ext]'
      }
    }
  ]
};
