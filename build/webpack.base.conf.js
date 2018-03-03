'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    'vendor': ['vue', 'vue-router'],
    'vui': './examples/src/index.js'
  },
  output: {
    path: path.join(__dirname, '../examples/dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  // entry: {
  //   app: './src/main.js'
  // },
  // output: {
  //   path: config.build.assetsRoot,
  //   filename: '[name].js',
  //   publicPath: process.env.NODE_ENV === 'production'
  //     ? config.build.assetsPublicPath
  //     : config.dev.assetsPublicPath
  // },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'src': path.join(__dirname, '../src'),
      'packages': path.join(__dirname, '../packages'),
      'lib': path.join(__dirname, '../lib'),
      'components': path.join(__dirname, '../examples/src/components')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}

// if (process.env.NODE_ENV === 'production') {
//   delete module.exports.devtool;
//   module.exports.output = {
//     path: path.join(__dirname, '../examples/dist'),
//     publicPath: '/vui',
//     filename: '[name].[hash:8].js'
//   };
//   module.exports.plugins = module.exports.plugins.concat([
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: JSON.stringify(process.env.NODE_ENV)
//       }
//     }),
//     new webpack.optimize.UglifyJsPlugin({
//       compress: {
//         warnings: false,
//         drop_console: true
//       },
//       output: {
//         comments: false
//       },
//       sourceMap: false
//     }),
//     new webpack.optimize.CommonsChunkPlugin({
//       name: 'vendor',
//       minChunks: Infinity
//     })
//   ]);
// }
