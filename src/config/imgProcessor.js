/**
 * Load modules required
 */
const Jimp = require('jimp'),
      path = require('path'),
      jimp = require('jimp')

module.exports = {
    convertImgBlog: (file) => {
        Jimp.read(path.resolve(file.path))
        .then(image => {
            let cube   = image.clone(),
                thumb  = image.clone(),
                big    = image.clone()
            thumb.cover(500, 500)
                .quality(90)
                .write(path.resolve('./public/images/blog/landing/' + file.filename));
            thumb.cover(500, entierAleatoire(350, 500))
                 .quality(90)
                 .write(path.resolve('./public/images/blog/thumb/' + file.filename));
            big.cover(1280,400)
                 .quality(80)
                 .write(path.resolve('./public/images/blog/big/' + file.filename));
        })
        .catch(err => {
            res.status(500).send(err).end()
        })
    },
    convertPictureUser: user => {
        return Jimp.read(path.resolve('./public/images/picture/' + Math.floor(Math.random() * Math.floor(33) + 1) + '.png'))
        .then(picture => {
            picture.write(path.resolve('./public/images/users/pictures/' + user.picture))
        })
        .catch(err => {
            res.status(500).send(err).end()
        })
    },
    convertAvatarUser: user => {
        return Jimp.read(path.resolve('./public/images/avatar/avatar-' + Math.floor(Math.random() * Math.floor(9) + 1) + '.png'))
        .then(avatar => {
            avatar.write(path.resolve('./public/images/users/avatars/' + user.avatar))
        })
        .catch(err => {
            res.status(500).send(err).end()
        })
    }
}
function entierAleatoire(min, max) {
    return Math.floor((Math.random() * Math.floor(2))) * (500 - 350) + 350;
}