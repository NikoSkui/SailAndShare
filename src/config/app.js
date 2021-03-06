/**
 * Load module required
 */
const debug          = require('debug')('app'), // so that the app can use reporting debug
      path           = require('path'),
      morgan         = require('morgan'),
      serveStatic    = require('serve-static'),
      bodyParser     = require('body-parser'),
      methodOverride = require('method-override'),
      session        = require('express-session'),
      flash          = require('connect-flash'),
      passport       = require('passport'),
      mailer         = require('express-mailer')

module.exports = (app) => {

    debug('Setting up common configuration...')

    /**
     * The 'dotenv' module basically reads data from a .env file
     * and loads it to process.env
     */
    require('dotenv').config()

    /**
     * Setting the port that the app will use,
     * prioritizing the first command line argument if present,
     * then the value of PORT from a .env file if present,
     * and would default to 3000 in the absence of both preceding values.
     */
    app.set('port', process.argv[2] || process.env.NODE_PORT || 3000)

    /**
     * Set the view (templating) engine as Pug
     */
    app.set('view engine', 'pug')

    /**
     * Set the views directory
     */
    app.set('views', path.join(path.dirname(__dirname),'views'))

    /**
     * Use 'morgan' middleware for HTTP logging purposes
     */
    app.use(morgan('dev'))

    /**
     * Use 'passport' middleware for Authentification
     */
    // Express Session
    app.use(session({
        secret:'localAuth',
        saveUninitialized: true,
        resave: true
    }))
    // Passport init
    app.use(passport.initialize())
    app.use(passport.session()) // persistent login sessions
    // Connect Flash
    app.use(flash())
    // Global Vars
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        res.locals.user = req.user || null;
        next();
    });

    /**
     * Use 'express-mailer' middleware to send mail
     */
    mailer.extend(app, {
        from: 'notifications@sailandshare.fr',
        host: 'mail.gandi.net', // hostname
        secureConnection: true, // use SSL
        port: 465, // port for secure SMTP
        transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PSWD
        }
      });

    /**
     * Use 'body-parser' middleware to parse data coming from forms and other
     * types of requests (programmatically-made requests, later on this one).
     */
     app.use(bodyParser.json());
     app.use(bodyParser.urlencoded({ extended: true }));

    /**
     * Use the 'serve-static' middleware to catch requests for asset files and serve
     */
    app.use('/assets', serveStatic(path.join(path.dirname(path.dirname(__dirname)), '/public')));

    /**
     * Here we use methodOverride middleware to allow X-HTTP requests, as well as
     * PUT and DELETE methods passed in as query string
     */
    app.use(methodOverride(function (req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
          // look in urlencoded POST bodies and delete it
          var method = req.body._method
          delete req.body._method
          return method
        }
      }))

    if (process.env.NODE_ENV === 'development') {

        // ************************************
        // This is the process to run webbpack with middlewares
        // ************************************

        // Step 1: Create & configure a webpack compiler
        const webpack       = require('webpack'),
              webpackConfig = require(path.resolve('./assets/webpack/webpack.dev')),
              compiler      = webpack(webpackConfig)

        // Step 2: Attach the dev middleware to the compiler & the server
        app.use(require("webpack-dev-middleware")(compiler, {
        noInfo: true, publicPath: webpackConfig.output.publicPath,
            stats: {
                colors: true,
                hash: false,
                timings: true,
                chunks: false,
                chunkModules: false,
                modules: false
            }
        }));

        // Step 3: Attach the hot middleware to the compiler & the server
        app.use(require("webpack-hot-middleware")(compiler, {
            log: console.log,
            path: '/__webpack_hmr',
            heartbeat: 10 * 1000
        }));
    }

}