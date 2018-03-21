/**
 * Load module required
 */
const multer = require('multer')

/**
 * Defined image emplacement
 */
const storage = multer.diskStorage({
      destination: function (req, file, cb) {
          cb(null, './public/images/gallery')
      },
      filename: function (req, file, cb) {
          console.log(file)
          cb(null, Date.now() + '.' + file.mimetype.substr(file.mimetype.indexOf('/')+1))
      }
  })

const upload = multer({ storage: storage });

module.exports = upload