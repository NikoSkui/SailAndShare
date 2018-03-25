/**
 * Load module required
 */
const router   = require('express').Router(), // Create new instance Router
      article  = require('./controllers/crudArticleController'), // load associated Controller
      category = require('./controllers/crudCategoryController'), // load associated Controller
      debug    = require('debug')('router'), // so that the app can use reporting debug
      path     = require('path'),
      upload   = require(path.resolve('./src/config/uploader')) // for image uploade

/**
 * Blog - admin routes
 * Defining the index route by implementing the methods CRUD
 */
debug('Defined the Admin Blog routes')
// Create - Post méthod.
router.post('/articles/', article.create)
// Read - Get méthod.
router.get('/articles/', article.index)
router.get('/articles/:id', article.show)
// Update - Put méthod.
router.post('/articles/:id', upload.single('file'), article.edit)
// Delete - Delete méthod.
router.delete('/articles/:id', article.delete)

/**
 * Categories - admin routes
 * Defining the index route by implementing the methods CRUD
 */
debug('Defined the Admin Blog routes')
// Create - Post méthod.
router.post('/categories/', category.create)
// Read - Get méthod.
router.get('/categories/', category.index)
// // Update - Put méthod.
router.put('/categories/:id', category.edit)
// // Delete - Delete méthod.
router.delete('/categories/:id', category.delete)

/**
 * Exports all routes and name them
 */
exports.blog = router