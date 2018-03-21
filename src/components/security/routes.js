/**
 * Load module required
 */
const route         = require('express').Router(), // Create new instance Router
      controller    = require('./controllers/securityController'), // load associated Controller
      debug         = require('debug')('router'), // so that the app can use reporting debug
      passport      = require('../../config/passport')

// passport.use(new LocalStrategy(
//     (username, password, done) => {
//         Users.findOne({ fullname: username }, (err, user) => {
//             if (err) { return done(err); }
//             if (!user) {
//                 return done(null, false, { message: 'Incorrect username.' });
//             }
//             // if (!user.validPassword(password)) {
//             //     return done(null, false, { message: 'Incorrect password.' });
//             // }
//             return done(null, user);
//         });
//     }
// ));

// passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });

// passport.deserializeUser(function(id, done) {
//     Users.findById(id, function(err, user) {
//         done(err, user);
//     });
// });

/**
 * Blog - public routes
 * Defining the index route by implementing the methods GET
 */
debug('Defined the Security routes')
// Login - Get méthods.
route.get('/login', controller.login)
// Connect - Post méthods.
route.post('/login',
    passport.authenticate('local', { failureRedirect: '/users/login', failureFlash: true }),
    (req, res) => {
        console.log(req)
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
route.get('/logout', controller.logout)
// Create New passport - Get méthods.
route.get('/password/:passport', controller.createPassport)

/**
 * Exports all routes and name them
 */
exports.users = route