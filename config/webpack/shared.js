// Note: You must restart bin/webpack-dev-server for changes to take effect

/* eslint global-require: 0 */
/* eslint import/no-dynamic-require: 0 */

const webpack = require('webpack');
const { basename, dirname, join, relative, resolve } = require('path');
const { sync } = require('glob');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

const extname = require('path-complete-extname');
const { env, settings, output, loadersDir } = require('./configuration.js');

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

module.exports = {
  entry,

  output: {
    filename: '[name].js',
    path: output.path,
    publicPath: output.publicPath
  },

  module: {
    rules: sync(join(loadersDir, '*.js')).map(loader => require(loader))
  },

  plugins: [
    new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(env))),
    new ExtractTextPlugin(
      env.NODE_ENV === 'production' ? '[name]-[hash].css' : '[name].css'
    ),
    new ManifestPlugin({
      publicPath: output.publicPath,
      writeToFileEmit: true
    }),
    new webpack.DefinePlugin({
      'process.env.JSCOV': JSON.stringify(false)
    })
  ],

  resolve: {
    extensions: settings.extensions,
    modules: [
      resolve(settings.source_path),
      resolve(settings.source_path, 'app'),
      'node_modules'
    ],
    plugins: [new DirectoryNamedWebpackPlugin(true)],
    alias: {
      app: 'app',
      components: 'app/components',
      routes: 'app/routes'
    }
  },

  resolveLoader: {
    modules: ['node_modules']
  },

  node: {
    fs: 'empty',
    net: 'empty'
  }
};
