/**
 * Load module required
 */
const router                = require('express').Router(), // Create new instance Router
      landingPageController = require('./controllers/landingPageController') // load associated Controller

/**
 * LandingPage
 * Defining the index route by implementing the methods
 */

// all méthods. (GET, PUT, POST, DELETE, ...)
router.all('/', landingPageController)

/**
 * Exports all routes and name them
 */
exports.landing_page = router