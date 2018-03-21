/**
 * Load modules required
 */
const slug    = require('slug'),
      path    = require('path'),
      fs      = require('fs'),
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
        Users.find({}).sort('-_id').exec()
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
                    res.json(user)
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
            // fs.unlinkSync(path.resolve('./public/images/users/avatar/' + user.avatar))
            // fs.unlinkSync(path.resolve('./public/images/users/picture/' + user.picture))
            res.json('l\'utilisateur à bien été supprimé')
        })
        .catch(err => {
            res.status(500).send(err).end()
        })
    },
    mail: (req,res) => {
        res.mailer.send('email/register', {
            to: 'nicoscui@hotmail.fr', // REQUIRED. This can be a comma delimited string just like a normal email to field.
            subject: 'Test Email', // REQUIRED.
            otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
          }, (err) => {
            if (err) {
              // handle error
              console.log(err);
              res.status(500).send(err).end()
              return;
            }
            res.redirect('/admin/users');
          });
    }
}