/**
 * Load module required
 */
const router     = require('express').Router(), // Create new instance Router
      controller = require('./controllers/frontController'), // load associated Controller
      debug      = require('debug')('router') // so that the app can use reporting debug

/**
 * Blog - public routes
 * Defining the index route by implementing the methods GET
 */
debug('Defined the Blog routes')
// Read - Get méthods.
router.get('/', controller.index)
router.get('/:id', controller.show)

/**
 * Exports all routes and name them
 */
exports.blog = router