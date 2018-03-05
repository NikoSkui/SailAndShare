/**
 * Step 1
 * Load module required
 */
const debug  = require('debug')('server'),  // so that the app can use reporting debug
      app    = require('express')(),        // so that creating a new ExpressJS app
      server = require('http').Server(app)  // so that creating a new Server and pass express app to it as the handler
/**
 * Step 2
 * Load the bootstrapper for the app. What this does is basically
 * load all the necessary configurations essential to the application.
 */
require('./src/config/app')(app)

/**
 * Step 3
 * Load the database config
 */
require('./src/config/database')()

/**
 * Step 4
 * Load our 'router' for the app.
 */
require('./src/config/router')(app)

/**
 * Step 1
 * Tells the server to listen to a certain port for any requests
 */
server.listen(app.get('port'), () => {
    debug('Server listening on port http://%s:%d in %s mode',
        process.env.NODE_HOST,
        app.get('port'),
        process.env.NODE_ENV
    )
})