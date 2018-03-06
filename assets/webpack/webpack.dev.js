/**
 * Load module required
 */
const webpack     = require('webpack'),
      webpackBase = require('./webpack.base')

/**
 * CONFIGURATION DE DEVELOPMENT
 */

webpackBase.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin()
)

module.exports = webpackBase
