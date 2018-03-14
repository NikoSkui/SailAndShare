/**
 * Load module required
 */
const router     = require('express').Router(), // Create new instance Router
      controller = require('./controllers/crudBlogController'), // load associated Controller
      debug      = require('debug')('router'), // so that the app can use reporting debug
      path       = require('path'),
      upload     = require(path.resolve('./src/config/uploader')) // for image uploade

/**
 * Blog - admin routes
 * Defining the index route by implementing the methods CRUD
 */
debug('Defined the Admin Blog routes')
// Create - Post méthod.
router.post('/', controller.create)
// Read - Get méthod.
router.get('/', controller.index)
router.get('/:id', controller.show)
// Update - Put méthod.
router.post('/:id', upload.single('file'), controller.edit)
// Delete - Delete méthod.
router.delete('/:id', controller.delete)

/**
 * Exports all routes and name them
 */
exports.blog = router