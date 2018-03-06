/**
 * Load module required
 */
const debug = require('debug')('router'), // so that the app can use reporting debug
      fs    = require('fs'), // for accessing the filesystem of the host
      path = require('path') // for manipulating directory strings

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
            let routes = require(`../${modulesDir}/${moduleDir}/routes`);
            Object.keys(routes).forEach(route => {
                app.use(`/${route.replace('_','-')}`, routes[route])
            })
        });
    })

    /**
     * Define the main index route of the app and what it should do
     */
    if (!process.env.MAIN) {
        debug(`
            Your .env file should have a MAIN variable like this:
            MAIN=home/index
            ...this maps the application's index route ('http://localhost:3009')
            to home module's routes.js' index method.

        `);
        throw 'Kindly update your .env configuration file and include a MAIN variable for your main module';
    }

    var mainModule = process.env.MAIN.split('/');
    app.use('/', require(`../${modulesDir}/${mainModule[0]}/routes`)[mainModule[1]]);

}