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
const Articles   = require('../models/articleModel'),
      Categories = require('../models/categoryModel')

/**
 * Defined dev mode
 */
let dev = process.env.NODE_ENV === 'development'

module.exports = {

    // Read all categories
    index: (req,res) => {
        // Find all Articles
        Categories.find({}).sort('-_id').exec()
        .then(categories => {
            res.render('admin/blog/categories/index', {categories:categories})
        })
        .catch(err => {
            res.status(500).send(err).end()
        })
    },
    // Create one category
    create: (req,res) => {
        new Categories({
            name : req.body.name
        }).save()
        .then(category => {
            res.json(category)
        })
        .catch(err => {
            res.status(500).send(err).end()
        })
    },
    // Update one category
    edit: (req,res) => {
        // Find all Articles
        Categories.findById(req.params.id).exec()
        .then(category => {
            category.name = req.body.name
            return category.save()
        })
        .then(category => {
            res.json(category)
        })
        .catch(err => {
            res.status(500).send(err).end()
        })
    },
    // Delete one category
    delete: (req,res) => {
        Categories.findByIdAndRemove(req.params.id).exec()
        .then((category) => {
            res.json('la catégorie à bien été supprimé')
        })
        .catch(err => {
            res.status(500).send(err).end()
        })
    }
}