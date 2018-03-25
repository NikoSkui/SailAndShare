/**
 * Load module required
 */
const router     = require('express').Router(), // Create new instance Router
      controller = require('./controllers/landingPageController'), // load associated Controller
      debug = require('debug')('router') // so that the app can use reporting debug

/**
 * LandingPage
 * Defining the index route by implementing the methods
 */
debug('Defining the LandingPage route')

// all méthods. (GET, PUT, POST, DELETE, ...)
router.all('/', controller)

/**
 * Exports all routes and name them
 */
exports.landing_page = router