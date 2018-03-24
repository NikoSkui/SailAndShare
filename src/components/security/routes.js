/**
 * Load module required
 */
const router        = require('express').Router(), // Create new instance Router
      controller    = require('./controllers/securityController'), // load associated Controller
      debug         = require('debug')('router'), // so that the app can use reporting debug
      passport      = require('../../config/passport')

/**
 * Blog - public routes
 * Defining the index route by implementing the methods GET
 */
debug('Defined the Security routes')
// Login - Get méthods.
router.get('/login', controller.login)
// Connect - Post méthods.
router.post('/login',
    passport.authenticate('local', { failureRedirect: '/users/login', failureFlash: true }),
    (req, res) => {
        req.flash('success_msg', 'Vous êtes bien connecté')
        switch (req.user.role) {
            case 'admin':
                res.redirect('/admin');
                break;
            case 'membre':
                res.redirect('/blog');
                break;
        }
    }
)
// Logout - Get méthods.
router.get('/logout', controller.logout)
// Check Email - Get méthod.
router.get('/verifyEmail/:token', controller.verifyEmail)
// Reset Password - Get méthod.
router.get('/password/reset/:token', controller.resetPassword)
// Reset Password - Post méthod.
router.post('/password/reset/:token', controller.resetPassword)
// Forgot Password - Get méthod.
router.get('/password/forgot', controller.forgotPassword)
// Forgot Password - Post méthod.
router.post('/password/forgot', controller.forgotPassword)

// FOR TEST
// Encrypt New passport - Get méthods.(comment this line in prod)
router.get('/password/encrypt/:passport', controller.createPassport)

/**
 * Exports all routes and name them
 */
exports.users = router