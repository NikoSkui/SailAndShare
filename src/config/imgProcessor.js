/**
 * Load modules required
 */
const Jimp = require('jimp'),
      path = require('path'),
      jimp = require('jimp')

module.exports = {
    convertImg: file => {
        console.log(file)
        Jimp.read(path.resolve(file.path))
        .then(image => {
            let thumb  = image.clone();
            let big    = image.clone();
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
    }
}
function entierAleatoire(min, max) {
    return Math.floor((Math.random() * Math.floor(2))) * (500 - 350) + 350;
}