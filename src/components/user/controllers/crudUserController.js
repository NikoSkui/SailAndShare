/**
 * Load modules required
 */
const slug    = require('slug'),
      path    = require('path'),
      fs      = require('fs'),
      jwt     = require('jsonwebtoken'),
      imgProc = require(path.resolve('./src/config/imgProcessor'))  // for manipulate file uploaded

/*
 * Load models required
 */
const Users = require('../models/userModel')
/**
 * Defined dev mode
 */
let dev = process.env.NODE_ENV === 'development'

module.exports = {

    // Read all users
    index: (req, res) => {
        Users.find({ _id: { $ne: res.locals.user._id } })
        .sort('-_id').exec()
        .then(users => {
            res.render('admin/user/index', {users:users})
        })
        .catch(err => {
            res.status(500).send(err).end()
        })
    },
    // Create one user
    create: (req,res) => {
        new Users({
            fullname: req.body.fullname,
            email:    req.body.email,
            avatar:   "avatar-" + Date.now() + ".png",
            picture:  "picture-" + Date.now() + ".png",
        }).save()
        .then(user => {
            imgProc.convertPictureUser(user)
            .then(() => {
                imgProc.convertAvatarUser(user)
                .then(() => {
                    // tommorow's date
                    var info = {}
                    info.user = user

                    jwt.sign(info,process.env.JWT_SECRET,{
                        expiresIn: process.env.JWT_TIMEOUT_ACTIVATION
                    }, (err,token) => {
                        if (err) res.status(500).send(err).end()
                        console.log("http://localhost:3000/users/verifyEmail/" + token)

                        res.mailer.send('email/register', {
                            to: info.user.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
                            subject: 'Sail And Share | Activation de votre compte', // REQUIRED.
                            token: token // All additional properties are also passed to the template as local variables.
                        }, (err) => {
                            if (err) {
                              // handle error
                              res.status(500).send(err).end()
                              return;
                            }
                            // res.redirect('/admin/users');
                            res.json(user)
                        });
                    })

                })
            })
        })
        .catch(err => {
            res.status(500).send(err).end()
        })
    },
    // Delete one user
    delete: (req,res) => {
        Users.findByIdAndRemove(req.params.id).exec()
        .then((user) => {
            let basePath = './public/images/users/avatars/'
            if (fs.existsSync(path.resolve(basePath + user.avatar))) {
                fs.unlinkSync(path.resolve(basePath + user.avatar))
                fs.unlinkSync(path.resolve('./public/images/users/pictures/' + user.picture))
                res.json('l\'utilisateur à bien été supprimé')
            }
        })
        .catch(err => {
            res.status(500).send(err).end()
        })
    }
}