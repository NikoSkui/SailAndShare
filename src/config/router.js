/**
 * Load module required
 */
const debug = require('debug')('router'), // so that the app can use reporting debug
      fs    = require('fs'), // for accessing the filesystem of the host
      path = require('path'), // for manipulating directory strings
      passport   = require('./passport')

module.exports = (app) => {

    debug('Setting up routes...')

    /**
     * A variable to identify the directory of where the application modules
     * can be found.
     */
    let modulesDir =  'components';

    /**
     * Loop on all components folder and load all routing modules in app
     */
    fs.readdir(path.join(path.dirname(__dirname),modulesDir), (err,modules) => {
        modules.forEach(moduleDir => {

            // Defined root path
            let frontRouteFileDir = path.join(path.dirname(__dirname),`/${modulesDir}/${moduleDir}/routes`),
                adminRouteFileDir = path.join(path.dirname(__dirname),`/${modulesDir}/${moduleDir}/adminRoutes`)

            // Check if adminRoute.js exist and create little routerApp for each folders with route.js
            if (fs.existsSync(frontRouteFileDir + '.js')) {
                let routes = require(frontRouteFileDir)
                Object.keys(routes).forEach(route => {
                    app.use(`/${route.replace('_','-')}`, routes[route])
                })
            }
            // Check if adminRoute.js exist and create little routerApp for each folders with adminRoute.js
            if (fs.existsSync(adminRouteFileDir + '.js')) {
                let adminRoutes = require(adminRouteFileDir)
                Object.keys(adminRoutes).forEach(route => {
                    app.use(`/admin/${route.replace('_','-')}`, passport.ensureAuthenticatedAdmin, adminRoutes[route])
                })
            }
        });
    })

    /**
     * Define the main index route of the app and what it should do
     */
    if (!process.env.MAIN) {
        debug(`
            Your .env file should have a MAIN variable like this:
            MAIN=home/index
            ...this maps the application's index route ('http://localhost:3000')
            to home module's routes.js' index method.

        `);
        throw 'Kindly update your .env configuration file and include a MAIN variable for your main module';
    }

    var mainModule = process.env.MAIN.split('/');
    app.use('/', require(`../${modulesDir}/${mainModule[0]}/routes`)[mainModule[1]]);

}