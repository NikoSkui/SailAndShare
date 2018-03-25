/**
 * Load module required
 */
const debug         = require('debug')('passport'), // so that the app can use reporting debug
      passport      = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      Users         = require('../components/user/models/userModel')

debug('Defined the Passport config')

passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    (email, password, done) => {

        Users.findOne({ email: email }, (err, user) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'email incorrect.' });
            }
            Users.comparePassword(password, user.password, (err, isMatch) => {
                if (err) { return done(err); }
                if(isMatch){
                    return done(null, user);
                } else {
                    return done(null, false, {message: 'Mot de passe incorrect'});
                }
            });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    Users.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.ensureAuthenticatedAdmin = (req, res, next) => {

    if(req.isAuthenticated() && req.user.role === 'admin') return next()

    if(req.isAuthenticated()) {
        req.flash('error_msg','Vous n\'êtes pas autorisé à accéder à cet espace' );
        res.redirect('/blog');
    } else {
        req.flash('error_msg','Vous n\'êtes pas connecté' );
        res.redirect('/users/login');
    }

}

module.exports = passport
