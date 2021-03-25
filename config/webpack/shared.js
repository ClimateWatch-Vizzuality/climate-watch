// Note: You must restart bin/webpack-dev-server for changes to take effect

/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

// new ExtractTextPlugin(
//   env.NODE_ENV === 'production' ? '[name]-[hash].css' : '[name].css'
// ),
// new ManifestPlugin({
//   publicPath: output.publicPath,
//   writeToFileEmit: true
// }),

const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const { basename, dirname, join, relative, resolve } = require('path');
const { sync } = require('glob');
// const ManifestPlugin = require('webpack-manifest-plugin');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

const extname = require('path-complete-extname');
const { env, settings, output, publicPath } = require('./configuration.js');

const extensionGlob = `**/*{${settings.extensions.join(',')}}*`;
const entryPath = join(settings.source_path, settings.source_entry_path);
const packPaths = sync(join(entryPath, extensionGlob));

const entry = packPaths.reduce((map, entryParam) => {
  const localMap = map;
  const namespace = relative(join(entryPath), dirname(entryParam));
  localMap[
    join(namespace, basename(entryParam, extname(entryParam)))
  ] = resolve(entryParam);
  return localMap;
}, {});

const sourceMap = env.NODE_ENV === 'development';

const sassConfig = [
  {
    loader: 'css-loader',
    options: {
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

const sassLoader = {
  test: /\.(scss|sass)$/i,
  use: devConfig,
  exclude: /node_modules/
};
module.exports = {
  entry,

  output: {
    filename: '[name].js',
    path: output.path,
    publicPath: output.publicPath
  },

  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png|gif|eot|ttf|woff|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath,
              name:
                env.NODE_ENV === 'production'
                  ? '[name]-[hash].[ext]'
                  : '[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.js(\.erb)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css)$/i,
        use: [{ loader: 'style-loader' }, { loader: 'raw-loader' }],
        include: /node_modules/
      },
      {
        test: /\.erb$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'rails-erb-loader',
        options: {
          runner: 'bin/rails runner'
        }
      },
      {
        test: /\.(js|jsx)?(\.erb)?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      { ...sassLoader },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader'
          }
        ]
      }
    ]
    //  sync(join(loadersDir, '*.js')).map(loader => require(loader))
  },

  plugins: [
    new Dotenv(),
    // new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(env))),
    new webpack.EnvironmentPlugin(['ESP_API'])
    // new webpack.DefinePlugin({
    //   'process.env.JSCOV': JSON.stringify(false),
    //   'ESP_API': JSON.stringify(env.ESP_API)
    // })
  ],

  resolve: {
    extensions: settings.extensions,
    modules: [
      resolve(settings.source_path),
      resolve(settings.source_path, 'app'),
      'node_modules'
    ],
    plugins: [new DirectoryNamedWebpackPlugin()],
    alias: {
      app: 'app',
      components: 'app/components',
      routes: 'app/routes',
      process: 'process/browser'
    },
    fallback: {
      path: require.resolve('path-browserify'),
      process: false,
      fs: false,
      tls: false,
      net: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false
    }
  },

  resolveLoader: {
    modules: ['node_modules']
  }

  // node: {
  //   fs: 'empty',
  //   net: 'empty'
  // }
};
