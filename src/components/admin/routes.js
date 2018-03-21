/**
 * Load module required
 */
const router     = require('express').Router(), // Create new instance Router
      controller = require('./controllers/adminController'), // load associated Controller
      debug      = require('debug')('router') // so that the app can use reporting debug
      passport   = require('../../config/passport')

/**
 * Admin - public routes
 * Defining the index route by implementing the methods GET
 */
debug('Defined the Admin route')
// Read - Get méthods.
router.get('/', passport.ensureAuthenticatedAdmin, controller.index)

/**
 * Exports all routes and name them
 */
exports.admin = router