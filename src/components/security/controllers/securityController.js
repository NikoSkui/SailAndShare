const bcrypt   = require('bcryptjs')
module.exports = {
    login: (req,res) => {
        res.render('security/login');
    },
    logout: (req,res) => {
        req.logout();
        req.flash('success_msg', 'Vous êtes bien déconnecté');
        res.redirect('/blog');
    },
    createPassport: (req,res) => {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(req.params.passport, salt, function(err, hash) {
                console.log(hash)
            })
        })
    }
}