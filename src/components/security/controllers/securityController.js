/**
 * Load modules required
 */
const bcrypt   = require('bcryptjs'),
      jwt      = require('jsonwebtoken')

/*
 * Load models required
 */
const Users = require('../../user/models/userModel')

module.exports = {
    login: (req,res) => {
        res.render('security/login');
    },
    logout: (req,res) => {
        req.logout();
        req.flash('success_msg', 'Vous êtes bien déconnecté');
        res.redirect('/blog');
    },
    // Check email user and active account
    verifyEmail: (req,res) => {
        let token = req.params.token
        jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(500).send(err).end()
            Users.findOne({
                _id:         decoded.user._id,
                fullname:    decoded.user.fullname
            },(err,user) => {
                if (err) return res.status(500).send(err).end()
                user.is_verified = true;
                return user.save()
                .then(update_data => {
                    // tommorow's date
                    var info = {}
                    info.user = update_data
                    jwt.sign(info,process.env.JWT_SECRET,{
                        expiresIn: process.env.JWT_TIMEOUT_RESETPASWD
                    }, (err,token) => {
                        if (err) return res.status(500).send(err).end()
                        res.redirect('/users/password/reset/' + token)
                    })
                })
            })
        })
    },
    // Reset password
    resetPassword: (req,res) => {
        let token  = req.params.token
        jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(500).send(err).end()
            if (req.method == "POST") {
                let pswd  = req.body.password
                let cpswd = req.body.confirmPswd
                // do form handling
                if (pswd === cpswd && pswd.length > 0 ) {
                    Users.findOne({
                        _id:         decoded.user._id,
                        fullname:    decoded.user.fullname,
                        is_verified: true
                    },(err,user) => {
                        if (err) return res.status(500).send(err).end()
                        bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(pswd, salt, function(err, hash) {
                                if (err) return res.status(500).send(err).end()
                                user.password = hash;
                                user.save((err,update_data) => {
                                    res.redirect('/users/login')
                                })
                            })
                        })
                    })
                } else {
                    req.flash('error_msg', 'Les mots de passes ne sont pas identiques');
                    res.redirect('/users/password/reset/' + token)
                }
            } else {
                let title = "Définissez votre mot de passe"
                res.render('security/reset', {token,title});
            }
        })
    },
    // Forgot password
    forgotPassword: (req,res) => {
        if(req.method === 'POST') {
            let email = req.body.email
            Users.findOne({email : email}, (err,user) => {
                if (err) return res.status(500).send(err).end()
                if (!user) {
                    req.flash('error_msg', 'Aucun utilisateur n\'a été trouvé avec cet email');
                    res.redirect('/users/password/forgot/')
                }
                var info = {}
                info.user = user
                jwt.sign(info,process.env.JWT_SECRET,{
                    expiresIn: process.env.JWT_TIMEOUT_RESETPASWD
                }, (err,token) => {
                    if (err) res.status(500).send(err).end()
                    res.mailer.send('email/forgot', {
                        to: user.email,
                        subject: 'Sail And Share | Réinitialisation de votre mot de passe',
                        token: token
                    }, (err) => {
                        if (err) return res.status(500).send(err).end()
                        res.redirect('/users/login')
                    });
                })
            })

        } else {
            res.render('security/forgot')
        }
    },

    createPassport: (req,res) => {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.params.passport, salt, function(err, hash) {
                console.log(hash)
            })
        })
    }
}