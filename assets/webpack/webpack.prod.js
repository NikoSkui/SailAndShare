/**
 * Load module required
 */
const webpackBase        = require('./webpack.base'),
      path               = require('path'),
      uglifyJsPlugin     = require('uglifyjs-webpack-plugin'),
      manifestPlugin     = require('webpack-manifest-plugin')

/**
 * CONFIGURATION DE PRODUCTION
 */

webpackBase.plugins.push(
  new uglifyJsPlugin({sourceMap: false}),
  new manifestPlugin()
)

module.exports = webpackBase
